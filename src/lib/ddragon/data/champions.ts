'use server';

import { fetcher } from './fetcher';

export const getChampion = async ({
  patch,
  champion,
}: {
  patch: string;
  champion: string;
}): Promise<ChampionDetailed> =>
  fetcher<DDragonResponse<ChampionDetailed>>(
    `/cdn/${patch}/data/en_GB/champion/${champion}.json`,
  ).then(response => Object.entries(response.data).map(([, champion]) => champion)[0]);

export const getChampions = async ({ patch }: { patch: string }): Promise<Champion[]> =>
  fetcher<DDragonResponse<Champion>>(`/cdn/${patch}/data/en_GB/champion.json`).then(response =>
    Object.entries(response.data).map(([, champion]) => champion),
  );

export const getChampionsBySearchQuery = async ({
  patch,
  query,
}: {
  patch: string;
  query: string;
}): Promise<ChampionDetailed[]> => {
  return Promise.all(
    (await getChampions({ patch }))
      .filter(champion => champion.name.toLowerCase().includes(query.toLowerCase()))
      .map(champion => getChampion({ patch, champion: champion.id })),
  );
};
