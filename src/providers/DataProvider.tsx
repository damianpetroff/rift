'use client';

import { createContext, useContext, useMemo } from 'react';

export const DataProviderContext = createContext({ patch: '' } as { patch: string });

export default function DataProvider({
  children,
  patch,
}: Readonly<{ children: React.ReactNode; patch: string }>) {
  const value = useMemo(() => ({ patch }), [patch]);
  return <DataProviderContext.Provider value={value}>{children}</DataProviderContext.Provider>;
}

export function useData() {
  return useContext(DataProviderContext);
}
