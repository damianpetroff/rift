import { getImageUrl } from '@/lib/ddragon/assets/images';
import Image from 'next/image';

export default function ChampionCard({
  champion,
  patch,
}: Readonly<{ champion: ChampionDetailed; patch: string }>) {
  const img = getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_3.jpg` });
  return (
    <div
      className="relative z-10 h-72 w-40 overflow-hidden rounded-sm border border-white/25 transition-transform duration-100 ease-in-out hover:z-20 hover:scale-105"
      key={champion.key}
    >
      <Image
        src={img}
        alt={champion.name}
        style={{ objectFit: 'cover' }}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-y-2 p-2">
        <h2 className="text-center text-xs font-bold tracking-widest text-white/80 uppercase">
          {champion.name}
        </h2>
        <div className="flex justify-center gap-1">
          {champion.spells.map(spell => (
            <span
              key={spell.id}
              className="relative inline-block size-6 overflow-hidden rounded border border-black/10 shadow-sm shadow-black"
            >
              <Image
                src={getImageUrl({ type: 'spell', patch, imageFile: spell.image.full })}
                alt={spell.name}
                style={{ objectFit: 'cover' }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
