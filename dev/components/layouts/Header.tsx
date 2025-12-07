"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/constants/navigation";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const headerClassName = cn(
    "fixed top-10 z-50 w-full border-b border-white/10 backdrop-blur-md text-white shadow-lg",
    isHomePage ? "bg-transparent" : "bg-[#003087]"
  );

  return (
    <header className={headerClassName}>
      <div className="container flex h-14 sm:h-16 items-center gap-2 px-2 sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center mr-2 sm:mr-4 flex-shrink-0">
          <Image 
            src="/images/ypi-logo.png" 
            alt="YPI - Yellow Power International Logo" 
            width={120} 
            height={40}
            className="h-8 w-auto sm:h-10"
            priority
            quality={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {MAIN_NAV.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-white hover:text-gold-400 bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-gold-400 border-0">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-white hover:text-gold-400 bg-transparent hover:bg-white/10 transition-colors">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 ml-auto">
          <Button variant="default" size="sm" className="hidden sm:inline-flex bg-gold-500 hover:bg-gold-600 text-black font-semibold shadow-lg text-xs px-3 py-2" asChild>
            <Link href="/contact">GET QUOTE</Link>
          </Button>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-white hover:text-gold-400 hover:bg-white/10"
            onClick={onMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
