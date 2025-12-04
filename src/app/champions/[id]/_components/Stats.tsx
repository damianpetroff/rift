export default function Stats({ champion }: Readonly<{ champion: ChampionDetailed }>) {
  return (
    <section className="w-full max-w-xl">
      <h3 className="mb-2 text-lg font-semibold">Statistiques</h3>
      <ul className="grid grid-cols-2 gap-2">
        <li>PV: {champion.stats.hp}</li>
        <li>Mana: {champion.stats.mp}</li>
        <li>Attaque: {champion.stats.attackdamage}</li>
        <li>Vitesse d&apos;attaque: {champion.stats.attackspeed}</li>
        <li>Armure: {champion.stats.armor}</li>
        <li>Résistance magique: {champion.stats.spellblock}</li>
        <li>Vitesse de déplacement: {champion.stats.movespeed}</li>
      </ul>
    </section>
  );
}
