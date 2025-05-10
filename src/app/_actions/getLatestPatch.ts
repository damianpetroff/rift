'use server-only';

export const getLatestPatch = async () : Promise<string> => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
  return (await response.json() as string[])[0];
};