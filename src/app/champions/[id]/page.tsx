import { getImageUrl } from '@/lib/ddragon/assets/images';
import { getChampion } from '@/lib/ddragon/data';
import { getChampions } from '@/lib/ddragon/data/champions';
import { getLatestPatch } from '@/lib/ddragon/data/versions';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 86400; // Revalidate this page every 24 hours

export const generateStaticParams = async () => {
  const patch = await getLatestPatch();
  const champions = await getChampions({ patch });
  return champions.map(champion => ({
    id: champion.id,
  }));
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const patch = await getLatestPatch();
  const champion = await getChampion({ patch, champion: id });

  return (
    <main className="flex w-full flex-col items-start gap-8 p-12">
      <div>
        <h1 className="text-5xl font-bold">{champion.name}</h1>
        <h2 className="text-xl text-gray-500">{champion.title}</h2>
      </div>

      <div className="flex flex-row items-start gap-4">
        <div className="relative h-[600px] w-[330px]">
          <Image
            src={getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_0.jpg` })}
            alt={champion.name}
            style={{ objectFit: 'contain' }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-4">
          <section className="max-w-4xl text-left">
            <p className="text-sm text-gray-500 italic">"{champion.lore}"</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Rôles</h3>
            <div className="flex justify-center gap-2">
              {champion.tags.map(tag => (
                <span key={tag} className="rounded bg-slate-600 px-2 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="w-full max-w-xl">
            <h3 className="mb-2 text-lg font-semibold">Statistics</h3>
            <div className="grid grid-cols-2 gap-2 font-bold">
              <p className="flex flex-col justify-center">
                <span className="text-sm text-emerald-700 uppercase">Health</span>
                <span className="text-normal text-emerald-500">{champion.stats.hp}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-sky-700 uppercase">Mana</span>
                <span className="text-normal text-sky-500">{champion.stats.mp}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-amber-700 uppercase">AD</span>
                <span className="text-normal text-amber-500">{champion.stats.attackdamage}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-yellow-500 uppercase">AS</span>
                <span className="text-normal text-yellow-300">{champion.stats.attackspeed}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-yellow-700 uppercase">Armor</span>
                <span className="text-normal text-yellow-500">{champion.stats.armor}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-sky-700 uppercase">MR</span>
                <span className="text-normal text-sky-500">{champion.stats.spellblock}</span>
              </p>
              <p className="flex flex-col justify-center">
                <span className="text-sm text-amber-400 uppercase">Movement Speed</span>
                <span className="text-normal text-amber-400">{champion.stats.movespeed}</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Compétence passive */}
      <section className="w-full max-w-xl">
        <h3 className="mb-2 text-lg font-semibold">Passive</h3>
        <div className="flex items-center gap-4">
          <Image
            src={getImageUrl({ type: 'spell', patch, imageFile: champion.passive.image.full })}
            alt={champion.passive.name}
            width={48}
            height={48}
            unoptimized
          />
          <div>
            <p className="font-bold">{champion.passive.name}</p>
            <p className="text-sm">{champion.passive.description}</p>
          </div>
        </div>
      </section>

      {/* Sorts */}
      <section className="w-full max-w-xl">
        <h3 className="mb-2 text-lg font-semibold">Sorts</h3>
        <div className="flex flex-col gap-4">
          {champion.spells.map((spell, i) => (
            <div
              key={spell.id}
              className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-blue-50 via-white to-blue-100 p-4 shadow transition hover:scale-105 hover:shadow-lg"
            >
              <div className="relative aspect-square size-12">
                <Image
                  src={getImageUrl({ type: 'spell', patch, imageFile: spell.image.full })}
                  alt={spell.name}
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes="25vw"
                  className="rounded-full border-2 border-blue-300"
                  unoptimized
                />
                <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-400 font-bold text-white shadow">
                  {['Q', 'W', 'E', 'R'][i] ?? ''}
                </span>
              </div>
              <div>
                <p className="font-bold text-blue-700">{spell.name}</p>
                <p className="text-sm text-gray-700">{spell.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
