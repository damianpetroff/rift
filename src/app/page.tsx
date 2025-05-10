import { getChampion, getChampions } from '@ddragon/data/champions';
import { getLatestPatch } from '@ddragon/data/versions';
import ChampionCard from './_components/ChampionCard';

export default async function HomePage() {
  const patch = await getLatestPatch();
  const championsId = (await getChampions({ patch })).map(champ => champ.id);
  const champions = await Promise.all(championsId.map(id => getChampion({ patch, champion: id })));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xs">Latest Patch: {patch}</p>
      <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-sm lg:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-12">
          <h1 className="my-4 text-center text-4xl font-bold text-balance">Champions</h1>

          <div className="grid grid-cols-2 gap-4 font-normal sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {champions.map(champion => (
              <ChampionCard key={champion.id} champion={champion} patch={patch} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
