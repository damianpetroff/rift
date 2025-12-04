import { getChampion, getChampions } from '@ddragon/data/champions';
import { getLatestPatch } from '@ddragon/data/versions';
import ChampionsList from './_components/ChampionsList';

export default async function HomePage() {
  const patch = await getLatestPatch();
  const championsId = (await getChampions({ patch })).map(champ => champ.id);
  const champions = await Promise.all(championsId.map(id => getChampion({ patch, champion: id })));

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-24">
      <div className="z-10 flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex-row">
        <ChampionsList champions={champions} />
      </div>
    </main>
  );
}
