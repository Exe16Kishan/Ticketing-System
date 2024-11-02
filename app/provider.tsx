'use client';

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
