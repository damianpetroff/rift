const baseUrl = 'https://ddragon.leagueoflegends.com';

export const fetcher = async <T>(uri: string, init?: RequestInit): Promise<T> =>
  fetch(`${baseUrl}${uri}`, {
    next: { tags: [`champions`] },
    cache: 'force-cache',
    ...init,
  }).then(response => response.json());
