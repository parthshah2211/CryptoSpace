import { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { del, get, set } from "idb-keyval";
import React from "react";
import { PropsWithChildren } from "react";

interface QueryProviderProps extends PropsWithChildren {
  config?: QueryClientConfig;
  idbValidKey?: string;
  maxAge?: number;
}
export const QueryProvider: React.FC<QueryProviderProps> = ({
  children,
  config = {
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  },
  idbValidKey = "reactQuery",
  maxAge = 1000 * 60 * 60 * 12, // 12 hours
}) => {
  const client = new QueryClient(config);

  const persister: Persister = {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      const clientData = await get<PersistedClient>(idbValidKey);
      return clientData;
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  };

  return (
    <PersistQueryClientProvider
      client={client}
      persistOptions={{
        persister,
        maxAge,
        buster: "",
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider;