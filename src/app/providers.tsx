"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FunctionComponent, useState } from "react";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children?: React.ReactNode;
}

export const Providers: FunctionComponent<ProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
