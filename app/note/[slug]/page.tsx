import { notFound } from "next/navigation";
import { getNoteBySlug } from "@/lib/notes";
import { serializeMDX } from "@/lib/mdx";
import { NoteReader } from "@/components/reader/NoteReader";

interface NotePageProps {
  params: {
    slug: string;
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  const mdxContent = await serializeMDX(note.content);

  return <NoteReader note={note} mdxContent={mdxContent} />;
}

