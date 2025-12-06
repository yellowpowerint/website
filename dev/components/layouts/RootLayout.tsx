"use client";

import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayoutWrapper({ children }: RootLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <>
      <Header onMobileMenuToggle={() => setMobileNavOpen(true)} />
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
