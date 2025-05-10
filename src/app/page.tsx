import { getChampionsData } from './_actions/getChampions';
import { getLatestPatch } from './_actions/getLatestPatch';

export default async function HomePage() {
  const latestPatch = await getLatestPatch();
  const championData = await getChampionsData(latestPatch);
  const champions = Object.entries(championData.data).map(([, value]) => value.name);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xs">Latest Patch: {latestPatch}</p>
      <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-between gap-4 font-mono text-sm lg:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-12">
          <h1 className="text-center text-2xl font-bold text-balance">Champions</h1>
          <div className="grid grid-cols-4 bg-red-400">
            {champions.map(champion => (
              <p className="text-sm" key={champion}>
                {champion}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
