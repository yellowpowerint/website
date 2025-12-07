# Commodity Ticker Implementation

## Overview
The website now features a live commodity price ticker in the top navigation bar, displaying real-time prices for mining-relevant commodities.

## Features

### Displayed Commodities
- **Gold (XAU)** - Spot Gold price per troy ounce
- **Copper (HG)** - High-grade Copper price per pound
- **Silver (XAG)** - Spot Silver price per troy ounce

### Live Updates
- Prices refresh automatically every **5 minutes** (300 seconds)
- Ticker rotates displayed commodity every **8 seconds**
- Visual indicators show price changes (green for positive, red for negative)

## API Integration

### Default Behavior
The system uses fallback prices when no API key is configured, ensuring the ticker always displays data.

### Enabling Live Prices
To enable real-time commodity prices:

1. Obtain an API key from a metals price provider (e.g., https://metals.live)
2. Add to your `.env.local`:
   ```
   METALS_API_KEY=your_api_key_here
   ```
3. Restart the development server

### API Endpoint
- **Path**: `/api/commodities`
- **Method**: GET
- **Cache**: 5 minutes (300 seconds)
- **Fallback**: Returns default prices if API fails

## Technical Implementation

### Components
- **TopBar** (`components/layouts/TopBar.tsx`) - Main ticker component
- **API Route** (`app/api/commodities/route.ts`) - Commodity price fetcher

### Styling
- Dark navy background (#navy-900)
- Gold accent color for commodity symbols
- Responsive design for mobile/desktop

### Integration
The TopBar is integrated above the main header in `RootLayoutWrapper` and has a sticky position at the top of the viewport.

## Customization

### Changing Commodities
Edit the commodities array in `TopBar.tsx` and corresponding API mapping in `app/api/commodities/route.ts`.

### Adjusting Update Intervals
- **Price refresh**: Modify the interval in `TopBar.tsx` useEffect (default: 300000ms = 5 minutes)
- **Rotation speed**: Modify the rotation interval (default: 8000ms = 8 seconds)

### Alternative API Providers
The implementation can be adapted for different commodity price APIs:
- Metals-API.com
- Commodities-API.com
- Alphavantage (commodities endpoint)
- Custom internal data source

## Browser Compatibility
- Supported by all modern browsers
- Uses React hooks for state management
- Graceful degradation on API failures
