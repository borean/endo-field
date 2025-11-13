"use client";

import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search notes...",
  className,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div
      className={cn(
        "relative flex items-center",
        "border border-border rounded-input bg-surface",
        "transition-all duration-motion",
        className
      )}
    >
      <Search className="absolute left-3 h-4 w-4 text-text-muted icon" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-2.5",
          "bg-transparent text-text placeholder:text-text-muted",
          "focus:outline-none",
          "font-sans"
        )}
        aria-label="Search notes"
      />
    </div>
  );
}

