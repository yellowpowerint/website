import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { RootLayoutWrapper } from "@/components/layouts/RootLayout";
import { PowerBot } from "@/components/ai/PowerBot";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import "../styles/globals.css";
import { DEFAULT_METADATA } from "@/lib/seo/config";
import { organizationSchema } from "@/lib/structured-data/organization";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/images/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
        />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body className="antialiased font-sans">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
        <PowerBot />
        <WhatsAppButton variant="floating" />
        <Analytics />
      </body>
    </html>
  );
}
