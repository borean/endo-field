"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ContainerSize, PaddingSize, SpacingSize } from "@/lib/layout";

export interface LayoutContextValue {
  defaultContainer?: ContainerSize;
  defaultMaxWidth?: ContainerSize;
  defaultPadding?: PaddingSize;
  defaultSpacing?: SpacingSize;
}

const LayoutContext = createContext<LayoutContextValue>({});

export function useLayout() {
  return useContext(LayoutContext);
}

interface LayoutProviderProps {
  children: ReactNode;
  defaults?: LayoutContextValue;
}

export function LayoutProvider({ children, defaults = {} }: LayoutProviderProps) {
  return (
    <LayoutContext.Provider value={defaults}>
      {children}
    </LayoutContext.Provider>
  );
}

