import { getImageUrl } from '@/lib/ddragon/assets/images';
import { getChampion } from '@/lib/ddragon/data';
import { getLatestPatch } from '@/lib/ddragon/data/versions';
import Image from 'next/image';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const patch = await getLatestPatch();
  const champion = await getChampion({ patch, champion: id });

  return (
    <main className="flex flex-col items-center gap-8 p-12">
      <h1 className="text-5xl font-bold">{champion.name}</h1>
      <h2 className="text-xl text-gray-500">{champion.title}</h2>

      <div className="relative h-72 w-40">
        <Image
          src={getImageUrl({ type: 'loading', patch, imageFile: `${champion.id}_0.jpg` })}
          alt={champion.name}
          style={{ objectFit: 'contain' }}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <section className="max-w-2xl text-center">
        <p className="text-lg">{champion.lore}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold">Rôles</h3>
        <div className="flex justify-center gap-2">
          {champion.tags.map(tag => (
            <span key={tag} className="rounded bg-blue-200 px-2 py-1 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="w-full max-w-xl">
        <h3 className="mb-2 text-lg font-semibold">Statistiques</h3>
        <ul className="grid grid-cols-2 gap-2">
          <li>PV: {champion.stats.hp}</li>
          <li>Mana: {champion.stats.mp}</li>
          <li>Attaque: {champion.stats.attackdamage}</li>
          <li>Vitesse d'attaque: {champion.stats.attackspeed}</li>
          <li>Armure: {champion.stats.armor}</li>
          <li>Résistance magique: {champion.stats.spellblock}</li>
          <li>Vitesse de déplacement: {champion.stats.movespeed}</li>
        </ul>
      </section>

      {/* Compétence passive */}
      <section className="w-full max-w-xl">
        <h3 className="mb-2 text-lg font-semibold">Passive</h3>
        <div className="flex items-center gap-4">
          <Image
            src={getImageUrl({ type: 'spell', patch, imageFile: champion.passive.image.full })}
            alt={champion.passive.name}
            width={48}
            height={48}
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
