'use server';

import { fetcher } from './fetcher';

export const getChampion = async ({
  patch,
  champion,
}: {
  patch: string;
  champion: string;
}): Promise<ChampionDetailed> =>
  fetcher<DDragonChampionResponse<ChampionDetailed>>(
    `/cdn/${patch}/data/en_GB/champion/${champion}.json`,
  ).then(response => Object.entries(response.data).map(([, champion]) => champion)[0]);

export const getChampions = async ({ patch }: { patch: string }): Promise<Champion[]> =>
  fetcher<DDragonChampionResponse<Champion>>(`/cdn/${patch}/data/en_GB/champion.json`).then(
    response => Object.entries(response.data).map(([, champion]) => champion),
  );
