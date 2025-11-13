"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LightingContextValue {
  intensity: number;
  setIntensity: (value: number) => void;
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  lightMode: "bands" | "window";
  setLightMode: (mode: "bands" | "window") => void;
}

const LightingContext = createContext<LightingContextValue | undefined>(undefined);

export function useLighting() {
  const context = useContext(LightingContext);
  if (!context) {
    throw new Error("useLighting must be used within LightingProvider");
  }
  return context;
}

interface LightingProviderProps {
  children: ReactNode;
}

export function LightingProvider({ children }: LightingProviderProps) {
  const [intensity, setIntensity] = useState(85);
  const [isEnabled, setIsEnabled] = useState(true);
  const [lightMode, setLightMode] = useState<"bands" | "window">("bands");

  return (
    <LightingContext.Provider value={{ intensity, setIntensity, isEnabled, setIsEnabled, lightMode, setLightMode }}>
      {children}
    </LightingContext.Provider>
  );
}

