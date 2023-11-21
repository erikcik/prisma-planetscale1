"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProviderProps = {
  children: React.ReactNode | React.ReactNode[]; // since there can be mul,tple react nodes asssicated with the root loayot
};

const Provider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
