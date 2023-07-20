"use client";

import React, { FunctionComponent } from "react";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children?: React.ReactNode;
}

export const Providers: FunctionComponent<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
