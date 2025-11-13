"use client";

import React from "react";
import { motion } from "framer-motion";
import { Note } from "@/lib/types";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { NoteHeader } from "./NoteHeader";
import { InnerTabs } from "./InnerTabs";
import { cn } from "@/lib/utils";

interface NoteReaderProps {
  note: Note;
  mdxContent: MDXRemoteSerializeResult;
  onBack?: () => void;
  className?: string;
}

export function NoteReader({
  note,
  mdxContent,
  onBack,
  className,
}: NoteReaderProps) {
  return (
    <motion.div
      className={cn("min-h-screen", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <PageContainer container="xl" maxWidth="5xl" padding="lg">
        <Section spacing="xl" padding="none">
          <div className="card rounded-card p-8">
            <NoteHeader note={note} onBack={onBack} />
            <InnerTabs note={note} mdxContent={mdxContent} />
          </div>
        </Section>
      </PageContainer>
    </motion.div>
  );
}

