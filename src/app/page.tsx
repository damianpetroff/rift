import { getChampionsData } from "./_actions/getChampions";
import { getLatestPatch } from "./_actions/getLatestPatch";

export default async function LolPage() {
  const latestPatch = await getLatestPatch();
  const championData = await getChampionsData(latestPatch);
  const championNameById = Object.fromEntries(
    Object.entries(championData.data).map(
      ([, value]) => [value.key, value.name]
  ));


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xs">Latest Patch: {latestPatch}</p>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col w-full items-center justify-between gap-12">
          <h1 className="text-2xl font-bold text-balance text-center">Champions</h1>
          <pre>{JSON.stringify(championNameById, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
