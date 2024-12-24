// src/components/common/ClientProvider.tsx
"use client";

import { getProperties } from "@/store/propertySlice";
import Store from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {

  Store.dispatch(getProperties())
 
  return <Provider store={Store}>{children}</Provider>;
}
