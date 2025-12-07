"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { COMPANY_INFO } from "@/lib/constants/company";
import { MAIN_NAV, type NavItem } from "@/lib/constants/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left font-display text-navy">
            {COMPANY_INFO.name}
          </SheetTitle>
          <SheetDescription className="text-left">
            Mining Support Services Since {COMPANY_INFO.founded}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col space-y-4">
          {MAIN_NAV.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              onOpenChange={onOpenChange}
            />
          ))}

          <Separator />

          <Button className="w-full font-semibold" asChild>
            <Link href="/contact" onClick={() => onOpenChange(false)}>
              GET QUOTE
            </Link>
          </Button>
        </div>

        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium">Phone:</span>{" "}
            <a
              href={`tel:${COMPANY_INFO.phone1}`}
              className="hover:text-gold transition-colors"
            >
              {COMPANY_INFO.phone1}
            </a>
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-gold transition-colors"
            >
              {COMPANY_INFO.email}
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemProps {
  item: NavItem;
  onOpenChange: (open: boolean) => void;
}

function MobileNavItem({ item, onOpenChange }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.children) {
    return (
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between py-2 text-left font-semibold hover:text-gold transition-colors"
        >
          {item.title}
          <span className="text-xs">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="ml-4 flex flex-col space-y-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => onOpenChange(false)}
                className="py-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={() => onOpenChange(false)}
      className="py-2 font-semibold hover:text-gold transition-colors"
    >
      {item.title}
    </Link>
  );
}
