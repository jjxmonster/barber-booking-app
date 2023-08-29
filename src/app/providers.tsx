"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FunctionComponent } from "react";

import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

interface ProviderProps {
  children?: React.ReactNode;
}

export const Providers: FunctionComponent<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
