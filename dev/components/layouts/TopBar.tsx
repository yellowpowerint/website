"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommodityPrice {
  name: string;
  displayName: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function TopBar() {
  const router = useRouter();
  const [commodities, setCommodities] = React.useState<CommodityPrice[]>([
    { name: "Gold", displayName: "SPOT GOLD", symbol: "XAU", price: 2650.50, change: 12.30, changePercent: 0.47 },
    { name: "Copper", displayName: "COPPER", symbol: "HG", price: 4.15, change: -0.02, changePercent: -0.48 },
    { name: "Silver", displayName: "SILVER", symbol: "XAG", price: 31.25, change: 0.45, changePercent: 1.46 }
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Fetch live commodity prices
  const fetchCommodityPrices = React.useCallback(async () => {
    try {
      const response = await fetch('/api/commodities');
      if (response.ok) {
        const data = await response.json();
        setCommodities(data);
      }
    } catch (error) {
      console.error('Failed to fetch commodity prices:', error);
    }
  }, []);

  // Auto-refresh prices every 5 minutes (300000ms)
  React.useEffect(() => {
    fetchCommodityPrices();
    const interval = setInterval(fetchCommodityPrices, 300000);
    return () => clearInterval(interval);
  }, [fetchCommodityPrices]);

  // Rotate displayed commodity every 8 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commodities.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [commodities.length]);

  const handleSearchClick = () => {
    router.push('/search');
  };

  const currentCommodity = commodities[currentIndex];
  const isPositive = currentCommodity.change >= 0;

  return (
    <div className="w-full border-b bg-gray-900 text-white shadow-sm">
      <div className="container flex h-10 items-center justify-between px-4">
        {/* Left: Commodity Ticker */}
        <div className="flex items-center gap-3 text-sm">
          <TrendingUp className="h-4 w-4 text-gold-500" />
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-gold-500">{currentCommodity.displayName}</span>
            <span className="text-white">${currentCommodity.price.toFixed(2)}</span>
            <span className={cn(
              "text-xs flex items-center gap-1 font-medium",
              isPositive ? "text-green-400" : "text-red-400"
            )}>
              {isPositive ? "+" : ""}{currentCommodity.change.toFixed(2)} 
              ({isPositive ? "+" : ""}{currentCommodity.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Right: Publications & Search */}
        <div className="flex items-center gap-3">
          <Link 
            href="/publications" 
            className="text-xs font-medium hover:text-gold-400 transition-colors uppercase tracking-wide text-white"
          >
            PUBLICATIONS
          </Link>
          <span className="text-gray-500">|</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchClick}
            aria-label="Search"
            className="h-8 w-8 text-white hover:text-gold-400 hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
