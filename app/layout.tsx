import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { LayoutProvider } from "@/components/layout/LayoutProvider";
import { LightingProvider } from "@/components/common/LightingProvider";
import { AppShell } from "@/components/layout/AppShell";
import { LightingOverlay } from "@/components/common/LightingOverlay";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Endo—Field | Pediatric Endocrinology Notes",
  description: "Personal pediatric endocrinology notes with precision instrument aesthetic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans`}>
        <LayoutProvider
          defaults={{
            defaultContainer: "xl",
            defaultMaxWidth: "xl",
            defaultPadding: "lg",
            defaultSpacing: "md",
          }}
        >
          <LightingProvider>
            <AppShell>{children}</AppShell>
            <LightingOverlay />
          </LightingProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}

