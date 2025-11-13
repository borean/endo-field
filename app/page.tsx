import { HomePageClient } from "./HomePageClient";
import { getAllNotes, getAllCategories } from "@/lib/notes";

export default function HomePage() {
  const allNotes = getAllNotes();
  const categories = getAllCategories();

  return <HomePageClient initialNotes={allNotes} categories={categories} />;
}

