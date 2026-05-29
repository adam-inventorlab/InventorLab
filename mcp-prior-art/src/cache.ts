// File-based 24-hour cache keyed on (source, query payload). Prior-art queries
// during a Novelty Gate run often overlap; caching cuts API costs and
// rate-limit pressure substantially with negligible freshness loss.

import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';

const CACHE_DIR = join(homedir(), '.inventorlab', 'mcp-cache');
const TTL_MS = 24 * 60 * 60 * 1000;

let inited = false;

async function init() {
  if (inited) return;
  await mkdir(CACHE_DIR, { recursive: true });
  inited = true;
}

function keyFor(source: string, payload: unknown): string {
  return createHash('sha256')
    .update(`${source}:${JSON.stringify(payload)}`)
    .digest('hex');
}

export async function cached<T>(
  source: string,
  payload: unknown,
  compute: () => Promise<T>,
): Promise<T> {
  await init();
  const path = join(CACHE_DIR, `${keyFor(source, payload)}.json`);

  try {
    const content = await readFile(path, 'utf-8');
    const { ts, data } = JSON.parse(content);
    if (Date.now() - ts < TTL_MS) return data as T;
  } catch {
    // miss; fall through
  }

  const data = await compute();
  await writeFile(path, JSON.stringify({ ts: Date.now(), data }));
  return data;
}
