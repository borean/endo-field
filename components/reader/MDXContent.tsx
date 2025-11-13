"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  mdxContent: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxContent }: MDXContentProps) {
  return <MDXRemote {...mdxContent} />;
}

