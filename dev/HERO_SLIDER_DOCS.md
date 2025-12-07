# Hero Slider Documentation

## Overview
The homepage now features a full-screen, auto-rotating image slider that serves as the hero section, with the navigation menu overlaying it.

## Component: HeroSlider

**Location:** `components/sections/HeroSlider.tsx`

### Features

#### 1. **4 Rotating Slides**
- **Slide 1:** Powering Africa's Mining Future (centered text)
- **Slide 2:** Expert Production Drilling Solutions (left-aligned text)
- **Slide 3:** Safety First, Quality Always (centered text)
- **Slide 4:** Building Sustainable Mining Communities (right-aligned text)

#### 2. **Auto-Advance**
- Automatically rotates every **5 seconds**
- Pauses when user manually navigates
- Smooth fade transitions (1-second duration)

#### 3. **Manual Navigation**
- **Previous/Next Arrows:** Positioned on left/right sides
- **Dot Indicators:** Bottom center with active state
- **Progress Bar:** Bottom edge showing slide progression

#### 4. **Each Slide Contains:**
- Full-viewport-height background image (object-fit: cover)
- Dark gradient overlay (black/60 to black/40) for text readability
- Large headline with text shadow
- Sub-headline/description with text shadow
- Call-to-action button linking to relevant pages
- Configurable text alignment (left, center, right)

#### 5. **Responsive Design**
- Desktop: Large text, full-height images, prominent navigation
- Mobile: Scaled-down text, touch-friendly navigation
- All text remains readable with strong shadows and overlays

#### 6. **Navigation Menu Overlay**
- TopBar and Header use fixed positioning
- Z-index set to 50 (above hero slider's z-index 30)
- Semi-transparent navy background with backdrop blur
- White text with gold hover effects for visibility

## Customization

### Changing Slide Content

Edit the `SLIDES` array in `HeroSlider.tsx`:

```typescript
const SLIDES: Slide[] = [
  {
    id: 1,
    image: "your-image-url",
    headline: "Your Headline",
    subHeadline: "Your sub-headline text",
    ctaText: "Button Text",
    ctaLink: "/your-link",
    textPosition: "center", // "left" | "center" | "right"
  },
  // ... more slides
];
```

### Adjusting Auto-Advance Speed

Change the interval in the `useEffect` hook:

```typescript
setInterval(() => {
  nextSlide();
}, 5000); // Change 5000 to desired milliseconds
```

### Modifying Overlay Darkness

Adjust the gradient overlay in the slide rendering:

```typescript
<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
// Adjust the opacity values (e.g., /40, /60, /80)
```

### Adding More Slides

Simply add new slide objects to the `SLIDES` array. The component automatically:
- Adjusts dot navigation
- Updates progress bar calculation
- Handles rotation logic

## Image Requirements

### Recommended Specifications
- **Dimensions:** 2070×1380px or larger
- **Aspect Ratio:** 16:9 or 3:2
- **Format:** JPEG or WebP
- **File Size:** < 500KB (optimized)
- **Subject:** Central focus with clear space for text overlay

### Current Image Sources
All images are from Unsplash with mining/industrial themes:
1. Mining operations/equipment
2. Industrial drilling sites
3. Safety equipment/workers
4. Mining landscape/community

### Replacing Images
Update the `image` property in each slide object with:
- External URL (e.g., Unsplash, CDN)
- Local path (e.g., `/images/hero-1.jpg`)
- Next.js optimized images are automatically handled by the `Image` component

## Accessibility

- All navigation buttons have `aria-label` attributes
- Keyboard navigation supported
- Images have descriptive alt text
- Sufficient color contrast for text readability

## Performance

- First slide loads with `priority={true}` for LCP optimization
- Subsequent slides lazy-load
- Smooth CSS transitions (hardware-accelerated)
- Auto-play pauses on manual interaction to improve UX
- Homepage bundle size reduced from 42.7 kB to 7.42 kB

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS backdrop-filter support for menu blur
- Fallback to solid background if backdrop-filter unsupported
- Responsive breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)

## Related Components

- **TopBar** (`components/layouts/TopBar.tsx`) - Commodity ticker, fixed top position
- **Header** (`components/layouts/Header.tsx`) - Main navigation menu, fixed below TopBar
- **StatsSection** (`components/sections/StatsSection.tsx`) - Employee/company stats (moved out of hero)

## Testing Checklist

- [ ] All 4 slides display correctly
- [ ] Auto-advance works (5-second intervals)
- [ ] Manual navigation (arrows and dots) works
- [ ] Progress bar updates correctly
- [ ] Text is readable on all slide images
- [ ] Menu remains visible and clickable over slider
- [ ] Responsive on mobile, tablet, and desktop
- [ ] No layout shift or flash of unstyled content
- [ ] Smooth transitions between slides
- [ ] CTA buttons link to correct pages
