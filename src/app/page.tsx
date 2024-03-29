import { getChampionsData } from "./_actions/getChampions";
import { getLatestPatch } from "./_actions/getLatestPatch";
import { getRankedData } from "./_actions/getRankedData";

export default async function LolPage() {
  const latestPatch = await getLatestPatch();
  const championData = await getChampionsData(latestPatch);
  const championNameById = Object.fromEntries(
    Object.entries(championData.data).map(
      ([, value]) => [value.key, value.name]
  ));
  const rankedData = await getRankedData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xs">Latest Patch: {latestPatch}</p>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col w-full items-center justify-between gap-12">
          <h1 className="text-2xl font-bold text-balance text-center">Ranked Data</h1>
          {rankedData.data.map((champion) => (
            <div className="flex w-full border-t py-2" key={champion.id}>
              <div className="w-3/12">
                <h2 className="text-lg font-bold">{championNameById[champion.id]}</h2>
                <p className="text-xs">Win Rate: {champion.average_stats.win_rate}</p>
                <p className="text-xs">Pick Rate: {champion.average_stats.pick_rate}</p>
                <p className="text-xs">Ban Rate: {champion.average_stats.ban_rate}</p>
                <p className="text-xs">KDA: {champion.average_stats.kda}</p>
                <p className="text-xs">Tier: {champion.average_stats.tier}</p>
                <p className="text-xs">Rank: {champion.average_stats.rank}</p>
              </div>
              <div className="flex flex-col gap-8 w-full">
                {champion.positions.map((position, i) => (
                  <div key={position.name} className={`flex gap-4`}>
                    <div className="w-4/12">
                      <h3 className="text-lg font-bold">{position.name}</h3>
                      <p className="text-xs">Win Rate: {position.stats.win_rate}</p>
                      <p className="text-xs">Pick Rate: {position.stats.pick_rate}</p>
                      <p className="text-xs">Role Rate: {position.stats.role_rate}</p>
                      <p className="text-xs">Ban Rate: {position.stats.ban_rate}</p>
                      <p className="text-xs">KDA: {position.stats.kda}</p>
                      <p className="text-xs">Tier: {position.stats.tier_data.tier}</p>
                      <p className="text-xs">Rank: {position.stats.tier_data.rank}</p>
                    </div>
                    <div className="flex w-8/12 gap-4">
                      {position.roles.map((role) => (
                        <div key={role.name}>
                          <h5 className="text-md font-bold">{role.name}</h5>
                          <p className="text-xs">Win Rate: {role.stats.win_rate}</p>
                          <p className="text-xs">Role Rate: {role.stats.role_rate}</p>
                          <p className="text-xs">Play: {role.stats.play}</p>
                            <p className="text-xs">Win: {role.stats.win}</p>
                        </div>
                      ))}
                  </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
