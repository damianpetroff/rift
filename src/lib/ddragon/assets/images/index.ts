type ImageType =
  | 'splash'
  | 'loading'
  | 'square'
  | 'passive'
  | 'spell'
  | 'item'
  | 'profileicon'
  | 'map'
  | 'sprite';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

export const getImageUrl = ({
  type = 'square',
  patch,
  imageFile,
}: {
  type: ImageType;
  patch: string;
  imageFile: string;
}): string => {
  switch (type) {
    case 'splash':
      return `${baseUrl}/img/champion/splash/${imageFile}`;
    case 'loading':
      return `${baseUrl}/img/champion/loading/${imageFile}`;
    case 'square':
      return `${baseUrl}/${patch}/img/champion/${imageFile}`;
  }
  return `${baseUrl}/${patch}/img/${type}/${imageFile}`;
};
