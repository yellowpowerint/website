import { NextResponse } from 'next/server';

interface CommodityPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export async function GET() {
  try {
    const apiKey = process.env.METALS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        getDefaultCommodities(),
        { 
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
          },
        }
      );
    }

    const response = await fetch(
      `https://api.metals.live/v1/spot`,
      {
        headers: {
          'x-api-key': apiKey,
        },
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch commodity prices');
    }

    const data = await response.json();
    
    const commodities: CommodityPrice[] = [
      {
        name: "Gold",
        symbol: "XAU",
        price: data.gold?.price || 2650.50,
        change: data.gold?.change || 0,
        changePercent: data.gold?.changePercent || 0,
      },
      {
        name: "Copper",
        symbol: "HG",
        price: data.copper?.price || 4.15,
        change: data.copper?.change || 0,
        changePercent: data.copper?.changePercent || 0,
      },
      {
        name: "Silver",
        symbol: "XAG",
        price: data.silver?.price || 31.25,
        change: data.silver?.change || 0,
        changePercent: data.silver?.changePercent || 0,
      }
    ];

    return NextResponse.json(commodities, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Commodity API error:', error);
    return NextResponse.json(getDefaultCommodities(), {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
      },
    });
  }
}

function getDefaultCommodities(): CommodityPrice[] {
  return [
    { name: "Gold", symbol: "XAU", price: 2650.50, change: 12.30, changePercent: 0.47 },
    { name: "Copper", symbol: "HG", price: 4.15, change: -0.02, changePercent: -0.48 },
    { name: "Silver", symbol: "XAG", price: 31.25, change: 0.45, changePercent: 1.46 }
  ];
}
