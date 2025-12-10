"use client";

import * as React from "react";
import Link from "next/link";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/shared/SearchModal";
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
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const [commodities, setCommodities] = React.useState<CommodityPrice[]>([
    { name: "Gold", displayName: "SPOT GOLD", symbol: "XAU", price: 2650.50, change: 12.30, changePercent: 0.47 },
    { name: "Copper", displayName: "COPPER", symbol: "HG", price: 4.15, change: -0.02, changePercent: -0.48 },
    { name: "Silver", displayName: "SILVER", symbol: "XAG", price: 31.25, change: 0.45, changePercent: 1.46 }
  ]);

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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 backdrop-blur-sm text-white shadow-md" style={{ backgroundColor: '#003087' }}>
      <div className="container flex h-10 items-center justify-between px-2 sm:px-4">
        {/* Left: Commodity Ticker */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          {commodities.map((commodity) => {
            const isPositive = commodity.change >= 0;
            const basePrice = `$${commodity.price.toFixed(2)}`;
            const displayedPrice = isPositive ? basePrice : `(${basePrice})`;
            const formattedChange = isPositive
              ? `+$${Math.abs(commodity.change).toFixed(2)}`
              : `($${Math.abs(commodity.change).toFixed(2)})`;
            const formattedPercent = isPositive
              ? `+${Math.abs(commodity.changePercent).toFixed(2)}%`
              : `-${Math.abs(commodity.changePercent).toFixed(2)}%`;

            return (
              <div
                key={commodity.symbol}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 font-semibold",
                  // On mobile, only show Spot Gold; show all tickers from the sm breakpoint upwards
                  commodity.name !== "Gold" && "hidden sm:flex"
                )}
              >
                {isPositive ? (
                  <TrendingUp
                    className={cn(
                      "h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0",
                      "text-green-400"
                    )}
                  />
                ) : (
                  <TrendingDown
                    className={cn(
                      "h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0",
                      "text-red-400"
                    )}
                  />
                )}
                <span className="text-gold-500 hidden sm:inline">{commodity.displayName}</span>
                <span className="text-gold-500 sm:hidden">{commodity.symbol}</span>
                <span
                  className={cn(
                    "text-white",
                    !isPositive && "text-red-400"
                  )}
                >
                  {displayedPrice}
                </span>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs flex items-center gap-0.5 sm:gap-1 font-medium hidden xs:flex",
                    isPositive ? "text-green-400" : "text-red-400"
                  )}
                >
                  {formattedChange}
                  <span className="hidden sm:inline">
                    ({formattedPercent})
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Contact Us & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/contact" 
            className="text-white hover:text-gold-400 transition-colors text-sm font-medium"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
          <span className="text-gray-500">|</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search"
            className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:text-gold-400 hover:bg-white/10"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />
    </div>
  );
}
