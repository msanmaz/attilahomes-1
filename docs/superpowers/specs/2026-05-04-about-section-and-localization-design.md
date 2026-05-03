# ATTILA Real Estate — About Section & Localization

**Date:** 2026-05-04
**Status:** Approved
**Scope:** Add About section, localize all property data to Istanbul & Bodrum, two-layer location filtering

---

## Overview

Transform the ATTILA real estate site from a global luxury placeholder into a coherent personal brand site for Attila Utkucan, an independent realtor specializing in Istanbul and Bodrum. Two deliverables: a new About section on the homepage, and full localization of property data, filters, and supporting content.

## 1. About Section

### Placement

Between Featured Properties and Neighborhoods on the homepage (position 4 of 6 sections).

### Layout

Two-column grid: portrait photo left (~40%), text content right (~60%). Stacks vertically on mobile (image on top).

### Content

- **Section label:** "ABOUT" — gold accent, uppercase, letter-spaced (matches existing section labels)
- **Name:** "ATTILA UTKUCAN" — Cormorant Garamond, large display size, letter-spaced
- **Bio paragraph 1:** Positions him as an independent realtor in Istanbul, with local knowledge of the Bodrum and Istanbul markets, an eye for potential in historic properties
- **Bio paragraph 2:** His renovation/development work — transforming aging Istanbul apartments into modern spaces. Young, driven, hands-on
- **CTA:** "Learn More" button, outline style (consistent with existing `btn-outline` pattern)

### Photo

- Source: `/Users/mertosanmaz/Downloads/IMG_2070 copy.JPG`
- Copy into project as `assets/attila-portrait.jpg`
- Black background blends into `--bg-secondary` section background
- Subtle treatment: slight shadow or border for depth

### Visual Treatment

- Background: `var(--bg-secondary)` for separation from featured grid above
- Top border: `1px solid rgba(242,236,224,0.06)`
- Fade-in scroll animation (consistent with other sections)

## 2. Property Data Localization

### Property Mix (12 total)

**Istanbul (8 properties):**

| # | Name | Neighborhood | Type | Price | Beds | Key Angle |
|---|------|-------------|------|-------|------|-----------|
| 1 | Bosphorus penthouse | Beşiktaş | Sale | $1.2M | 4 | Aspirational anchor, waterfront views |
| 2 | Renovated apartment | Kadıköy | Sale | ₺8.5M | 3 | Renovation showcase |
| 3 | Art deco flat | Nişantaşı | Sale | $650K | 2 | High-end neighborhood |
| 4 | Furnished loft | Cihangir | Rent | ₺45,000/mo | 2 | Trendy expat area |
| 5 | Historic apartment | Galata | Rent | ₺38,000/mo | 1 | Character property |
| 6 | Waterfront residence | Bebek | Rent | $4,500/mo | 3 | Premium rental |
| 7 | Modern flat | Üsküdar | Rent | ₺32,000/mo | 2 | Asian side waterfront |
| 8 | Renovated duplex | Beşiktaş | Sale | ₺12M | 3 | Renovation showcase |

**Bodrum (4 properties):**

| # | Name | Neighborhood | Type | Price | Beds | Key Angle |
|---|------|-------------|------|-------|------|-----------|
| 9 | Aegean villa | Yalıkavak | Sale | $2.8M | 5 | Luxury coastal |
| 10 | Sea-view villa | Göltürkbükü | Sale | $1.9M | 4 | Luxury coastal |
| 11 | Holiday villa | Türkbükü | Rent | $8,000/mo | 4 | Seasonal rental |
| 12 | Renovated stone house | Bodrum Center | Sale | $420K | 3 | Renovation identity |

### Neighborhoods Section (3 cards)

Replaces Manhattan/Paris/London:

1. **Beşiktaş & Bosphorus** — Istanbul's European waterfront
2. **Kadıköy & Asian Side** — Istanbul's cultural hub
3. **Bodrum Peninsula** — coastal luxury

Use Unsplash images of Istanbul Bosphorus, Kadıköy, and Bodrum coastline.

## 3. Two-Layer Location Filtering

### Layer 1 — City

Toggle-button row (same style as All/Sale/Rent type filter):
`[All | Istanbul | Bodrum]`

### Layer 2 — Neighborhood

Dropdown that dynamically shows neighborhoods for the selected city:

- **All selected:** all neighborhoods from both cities
- **Istanbul selected:** Beşiktaş, Kadıköy, Nişantaşı, Cihangir, Galata, Bebek, Üsküdar
- **Bodrum selected:** Yalıkavak, Göltürkbükü, Türkbükü, Bodrum Center

### Behavior

- Selecting a city clears neighborhood selection from the other city
- Both layers compose with existing type, bedroom, and price filters
- Results count updates live

### Filter Bar Layout (left to right)

`[All | Istanbul | Bodrum]` `[All | Sale | Rent]` `[Neighborhoods v]` `[Bedrooms v]` `[Price Range v]` `[Clear All]`

## 4. Supporting Content Updates

### Hero

- Update headline to reflect Istanbul & Bodrum focus (e.g., "Exceptional Homes Across Istanbul & Bodrum")
- Replace hero image with Istanbul/Bosphorus or Bodrum coastline imagery
- Update subtitle copy

### Stats Ribbon

Adjust to realistic numbers for an independent agent:
- Properties listed (not 2,400+)
- Renovations completed
- Years of experience
- Client satisfaction

### Footer

- Update company info to Attila Utkucan's brand
- Istanbul-based contact info
- Keep same column structure

### Homepage Section Order

1. Hero
2. Stats Ribbon
3. Featured Properties
4. About Attila (new)
5. Neighborhoods
6. Footer

## 5. Technical Notes

- All changes stay within the single `index.html` file
- Photo asset copied to `assets/attila-portrait.jpg`
- No framework migration — that's a separate future design
- Existing design system (colors, typography, components) preserved exactly
- Two-layer filter state managed in the existing `activeFilters` object with a new `city` key

## Out of Scope

- Framework migration (React/Next.js) — future conversation
- Database integration — future conversation
- Contact form — belongs in framework migration when backend exists
- "As Seen In" press strip — no partnerships to show currently
