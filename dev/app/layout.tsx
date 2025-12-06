import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yellow Power International | Mining Support Services",
  description: "Yellow Power International provides comprehensive drilling and mining support services across Africa. Established 2017 in Madina, Greater Accra, Ghana.",
  keywords: ["mining support services", "drilling services", "Yellow Power International", "Ghana mining", "Pre Split Drilling", "Production Drilling", "Reverse Circulation", "Load and Haul", "Construction Services"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
