'use server-only';

import { fetcher } from './fetcher';

const endpoint = '/api/versions.json';

export const getLatestPatch = async (): Promise<string> =>
  fetcher<string[]>(endpoint).then(res => res[0]);
