import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "../styles/globals.css";

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
  title: "Yellow Power International | Mining Support Services",
  description: "Yellow Power International provides comprehensive drilling and mining support services across Africa. Established 2017 in Madina, Greater Accra, Ghana.",
  keywords: ["mining support services", "drilling services", "Yellow Power International", "Ghana mining", "Pre Split Drilling", "Production Drilling", "Reverse Circulation", "Load and Haul", "Construction Services"],
};

import { RootLayoutWrapper } from "@/components/layouts/RootLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased font-sans">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
