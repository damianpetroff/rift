type ChampionImageType = 'splash' | 'loading' | 'square' | 'passive' | 'spell';

export const getChampionImageUrl = ({
  type,
  patch,
  champion,
}: {
  type: ChampionImageType;
  patch: string;
  champion: string;
}): string => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/Aatrox.png`;
};
