'use client';

import { useState } from 'react';
import ChampionCard from './ChampionCard';

export default function ChampionsList({ champions }: Readonly<{ champions: ChampionDetailed[] }>) {
  const [search, setSearch] = useState('');

  return (
    <div className="flex w-full flex-col items-center justify-between gap-12">
      <h1 className="my-4 text-center text-4xl font-bold text-balance">Champions</h1>
      <input
        type="text"
        className="w-96 rounded-md border border-gray-300 p-2"
        placeholder="Search champions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4 font-normal sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-12">
        {champions
          .filter(champion => champion.name.toLowerCase().includes(search.toLowerCase()))
          .map(champion => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
      </div>
    </div>
  );
}
