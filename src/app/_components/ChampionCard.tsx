import { getImageUrl } from '@/lib/ddragon/assets/images';
import Image from 'next/image';

export default function ChampionCard({
  champion,
  patch,
}: Readonly<{ champion: ChampionDetailed; patch: string }>) {
  const img = getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_0.jpg` });
  return (
    <div
      className="relative z-10 h-80 w-44 overflow-hidden rounded-lg border border-white/25 transition-transform duration-100 ease-in-out hover:z-20 hover:scale-105"
      key={champion.key}
    >
      <Image
        src={img}
        alt={champion.name}
        style={{ objectFit: 'cover' }}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute right-0 bottom-0 left-0 z-50 flex flex-col gap-y-2 p-2">
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-sm font-bold tracking-widest text-white/80 uppercase">
            {champion.name}
          </h2>
          <p className="text-center text-xs font-thin text-white/80">{champion.title}</p>
        </div>
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
      <div className="absolute top-1/2 right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}
