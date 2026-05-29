#!/usr/bin/env node
// inventorlab-prior-art MCP server.
// Exposes prior-art search tools to Claude Code via stdio transport.
//
// Tools:
//   search_google_patents     — Google Patents BigQuery (global, requires GCP creds)
//   search_arxiv              — arXiv preprints (free)
//   search_semantic_scholar   — Semantic Scholar (peer-reviewed, free + optional key)
//   search_prior_art_all      — parallel fan-out across all sources, merged
//
// Note on US-only sources: USPTO PatentsView was retired and replaced by the
// USPTO Open Data Portal (ODP). ODP would add per-user credential friction
// (every InventorLab user would need their own USPTO API key) without
// meaningfully expanding the corpus — Google Patents BigQuery already
// indexes the USPTO grant feed and covers the US. We do not ship a
// US-specific source. If freshness on patents granted within the last 1-3
// weeks ever becomes important, ODP can be added as a fourth source
// without touching the others.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { searchGooglePatents } from './sources/google-patents.js';
import { searchArxiv } from './sources/arxiv.js';
import { searchSemanticScholar } from './sources/semantic-scholar.js';
import { PriorArtResult, SearchOptions } from './schema.js';

const QUALITY_SCHEMA = {
  type: 'string' as const,
  enum: ['fast', 'thorough'] as const,
  description:
    'fast = small result set, low latency, suitable for ambient Novelty Gate runs. ' +
    'thorough = larger result set, suitable for explicit /prior-art sessions.',
};

const TOOL_DEFS = [
  {
    name: 'search_google_patents',
    description:
      'Search the Google Patents public dataset via BigQuery. Covers all jurisdictions Google indexes (~100 countries, including the US). Requires GOOGLE_APPLICATION_CREDENTIALS env var. Best single source for patent prior-art across jurisdictions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' },
        quality: QUALITY_SCHEMA,
        yearFrom: { type: 'number', description: 'Filing year lower bound; default 1990.' },
        yearTo: { type: 'number', description: 'Filing year upper bound; default current year.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'search_arxiv',
    description:
      'Search arXiv preprints (export.arxiv.org/api/query). Free, no auth. Best for non-patent prior art in CS, math, physics, statistics.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' },
        quality: QUALITY_SCHEMA,
      },
      required: ['query'],
    },
  },
  {
    name: 'search_semantic_scholar',
    description:
      'Search Semantic Scholar for academic papers across all fields. Free; SEMANTIC_SCHOLAR_API_KEY env var raises rate limits. Returns citation counts.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' },
        quality: QUALITY_SCHEMA,
      },
      required: ['query'],
    },
  },
  {
    name: 'search_prior_art_all',
    description:
      'Run the query against all three configured sources in parallel and return merged results. Use this for the Novelty Gate or any single-call broad prior-art sweep. Per-source failures are logged to stderr and skipped (the call still returns whatever the surviving sources produced).',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number', description: 'Per-source limit, not total.' },
        quality: QUALITY_SCHEMA,
      },
      required: ['query'],
    },
  },
];

const server = new Server(
  { name: 'inventorlab-prior-art', version: '0.1.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  const opts = (args ?? {}) as SearchOptions;

  let results: PriorArtResult[] = [];

  try {
    if (name === 'search_google_patents') {
      results = await searchGooglePatents(opts);
    } else if (name === 'search_arxiv') {
      results = await searchArxiv(opts);
    } else if (name === 'search_semantic_scholar') {
      results = await searchSemanticScholar(opts);
    } else if (name === 'search_prior_art_all') {
      const settled = await Promise.allSettled([
        searchGooglePatents(opts),
        searchArxiv(opts),
        searchSemanticScholar(opts),
      ]);
      settled.forEach((s, i) => {
        if (s.status === 'rejected') {
          const sourceName = ['google-patents', 'arxiv', 'semantic-scholar'][i];
          console.error(`[${sourceName}] failed: ${s.reason?.message ?? s.reason}`);
        }
      });
      results = settled.flatMap((s) => (s.status === 'fulfilled' ? s.value : []));
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            { count: results.length, results },
            null,
            2,
          ),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [{ type: 'text', text: `Error: ${e?.message ?? String(e)}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('inventorlab-prior-art MCP server running on stdio');
