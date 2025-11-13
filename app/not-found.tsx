import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export default function NotFound() {
  return (
    <PageContainer container="xl" maxWidth="5xl" padding="lg">
      <Section spacing="xl" padding="none">
        <div className="card rounded-card p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-text-muted mb-8">Note not found.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-card bg-accent text-white hover:opacity-90 transition-opacity duration-motion"
          >
            Back to drawer
          </Link>
        </div>
      </Section>
    </PageContainer>
  );
}

