import { getLatestPatch } from '@/lib/ddragon/data/versions';
import DataProvider from '@/providers/DataProvider';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rift',
  description: "See the champions of League of Legends, doesn't do anything else yet.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const patch = await getLatestPatch();

  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider patch={patch}>
          <header className="flex w-full flex-row items-center justify-between border-b p-2 text-center text-sm text-gray-500">
            <div className="flex flex-row items-center gap-4">
              <p className="font-mono text-xl tracking-wider uppercase">Rift</p>
              <nav className="flex gap-4 text-white">
                <a href="/">Home</a>
              </nav>
            </div>
            <p className="text-normal text-slate-400">{patch}</p>
          </header>
          <div>{children}</div>
          <footer className="flex w-full flex-col items-center justify-center border-t p-4 text-center text-sm text-gray-500">
            <p>Data provided by Riot Games</p>
          </footer>
        </DataProvider>
      </body>
    </html>
  );
}
