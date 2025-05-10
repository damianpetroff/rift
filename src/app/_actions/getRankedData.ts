'use server-only';

type RankedData = {
  data: Array<{
    id: number,
    is_rotation: boolean,
    is_rip: boolean,
    average_stats: {
      win_rate: number,
      pick_rate: number,
      ban_rate: number,
      kda: number,
      tier: number,
      rank: number,
    },
    positions: Array<{
      name: string,
      stats: {
        win_rate: number,
        pick_rate: number,
        role_rate: number,
        ban_rate: number,
        kda: number,
        tier_data: {
          tier: number,
          rank: number,
          rank_prev: number,
          rank_prev_patch: number,
        },
      },
      roles: Array<{
        name: string,
        stats: {
          win_rate: number,
          role_rate: number,
          play: number,
          win: number,
        }
      }>,
      counters: Array<{
        champion_id: number,
        play: number,
        win: number,
      }>,
    }>,
  }>
  meta: {
    version: string,
    cached_at: string,
  }
}

export const getRankedData = async () : Promise<RankedData> => {
  const response = await fetch(`https://lol-web-api.op.gg/api/v1.0/internal/bypass/champions/euw/ranked`); // Deprecated
  return response.json();
};