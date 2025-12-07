"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayoutWrapper({ children }: RootLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const mainClassName = cn(
    "min-h-screen",
    !isHomePage && "pt-24 md:pt-28"
  );

  return (
    <>
      <TopBar />
      <Header onMobileMenuToggle={() => setMobileNavOpen(true)} />
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </>
  );
}
