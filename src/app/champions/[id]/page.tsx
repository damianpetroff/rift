import { getImageUrl } from '@/lib/ddragon/assets/images';
import { getChampion } from '@/lib/ddragon/data';
import { getLatestPatch } from '@/lib/ddragon/data/versions';
import Image from 'next/image';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const patch = await getLatestPatch();
  const champion = await getChampion({ patch, champion: id });

  return (
    <main className="flex flex-col items-center justify-between gap-4 p-24">
      <h1 className="text-4xl font-bold">{champion.name}</h1>
      <div className="relative h-72 w-40">
        <Image
          src={getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_0.jpg` })}
          alt={champion.name}
          style={{ objectFit: 'contain' }}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col">
        {champion.spells.map(spell => (
          <p key={spell.id}>{spell.name}</p>
        ))}
      </div>
      <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-sm lg:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-12"></div>
      </div>
    </main>
  );
}
