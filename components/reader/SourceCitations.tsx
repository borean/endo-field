"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { Source } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SourceCitationsProps {
  sources: Source[];
  className?: string;
  compact?: boolean;
}

/**
 * Formats a DOI into a proper DOI URL
 */
function formatDoiUrl(doi: string): string {
  // Remove any existing https://doi.org/ prefix
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//i, "").trim();
  return `https://doi.org/${cleanDoi}`;
}

/**
 * Formats a source in Vancouver citation style
 * Format: [number] Title. DOI: [link] (or PMID if no DOI)
 */
function formatVancouverCitation(source: Source, index: number, compact: boolean): React.ReactNode {
  const citationNumber = index + 1;
  const hasDoi = source.doi && source.doi.trim() !== "";
  const doiUrl = hasDoi ? formatDoiUrl(source.doi!) : null;
  const hasPmid = source.pmid && source.pmid.trim() !== "";
  // Only show PMID if there's no DOI
  const showPmid = !hasDoi && hasPmid;

  return (
    <li key={index} className="flex items-start gap-2">
      <span className="text-text-muted font-mono text-xs mt-0.5 flex-shrink-0">
        [{citationNumber}]
      </span>
      <div className="flex-1 text-xs leading-relaxed">
        <span className="text-text">{source.title}</span>
        {hasDoi && doiUrl && (
          <>
            {". "}
            <span className="text-text-muted">DOI: </span>
            <a
              href={doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-alt hover:text-accent-alt/80 inline-flex items-center gap-0.5 transition-colors duration-motion"
            >
              {source.doi}
              <ExternalLink className="h-2.5 w-2.5 icon" />
            </a>
          </>
        )}
        {showPmid && (
          <>
            {". "}
            <span className="text-text-muted">PMID: </span>
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-alt hover:text-accent-alt/80 inline-flex items-center gap-0.5 transition-colors duration-motion"
            >
              {source.pmid}
              <ExternalLink className="h-2.5 w-2.5 icon" />
            </a>
          </>
        )}
      </div>
    </li>
  );
}

export function SourceCitations({ sources, className, compact = false }: SourceCitationsProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className={cn(compact ? "space-y-1.5" : "space-y-4", className)}>
      {compact && (
        <p className="text-xs text-text-muted mb-2 font-medium">Sources</p>
      )}
      {!compact && (
        <h3 className="text-lg font-semibold mb-4 text-text">References</h3>
      )}
      <ol className={cn("list-none", compact ? "space-y-1.5" : "space-y-3")}>
        {sources.map((source, index) => formatVancouverCitation(source, index, compact))}
      </ol>
    </div>
  );
}

