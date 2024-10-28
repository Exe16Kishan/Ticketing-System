"use client";

import React, { ReactNode } from "react";
// import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
interface Provider {
  children: ReactNode;
}

export default function Providers({ children }: Provider) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
