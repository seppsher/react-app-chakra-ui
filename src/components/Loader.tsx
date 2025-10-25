'use client';

import { AbsoluteCenter, Spinner } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useState } from 'react';

const LoaderContext = createContext(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const value = {
    loading,
    startLoading,
    stopLoading,
  };

  return (
    <LoaderContext.Provider value={value}>
      {loading && (
        <AbsoluteCenter>
          <Spinner size="xl" />
        </AbsoluteCenter>
      )}

      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
