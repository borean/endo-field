"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
  applyBackground?: boolean;
  backgroundClass?: string;
}

export function AppShell({
  children,
  className,
  applyBackground = true,
  backgroundClass = "bg-bg",
}: AppShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen",
        applyBackground && backgroundClass,
        className
      )}
    >
      {children}
    </div>
  );
}

