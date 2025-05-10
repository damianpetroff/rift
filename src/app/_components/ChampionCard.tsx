import { getImageUrl } from '@/lib/ddragon/assets/images';
import Image from 'next/image';

export default function ChampionCard({
  champion,
  patch,
}: Readonly<{ champion: ChampionDetailed; patch: string }>) {
  const splashImage = getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_0.jpg` });
  if (champion.id.startsWith('Aurel')) console.log(champion);
  return (
    <div className="relative h-72 w-40" key={champion.key}>
      <Image
        src={splashImage}
        alt={champion.name}
        style={{ objectFit: 'cover' }}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <h2 className="bg-opacity-50 absolute right-0 bottom-0 left-0 p-2 text-center text-white">
        {champion.name}
      </h2>
    </div>
  );
}
