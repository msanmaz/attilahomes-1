# ATTILA — Real Estate Platform

## Project Overview

A curated real estate platform for **Attila Utkucan**, an independent realtor specializing in Istanbul and Bodrum properties. The platform has two faces:

- **Public site** — Property listings, detail pages, neighborhood exploration, interactive maps, agent profile
- **Admin dashboard** — Property CRUD, image management, listing settings, analytics overview

### Current State

Static HTML/CSS/JS prototypes in `index.html` (public) and `dashboard.html` (admin). Design language is finalized: dark luxury aesthetic with gold accents, Cormorant Garamond + Outfit fonts, Leaflet maps with CartoDB dark tiles. Ready for migration to a full-stack Next.js application.

### Tech Stack (Target)

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS variables for the design tokens
- **Database:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Maps:** react-leaflet with CartoDB dark_all tiles
- **Deployment:** TBD (decision pending)

---

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── (public)/                  # Public route group
│   │   ├── layout.tsx             # Public layout (nav + footer)
│   │   ├── page.tsx               # Homepage — SSG
│   │   ├── properties/
│   │   │   ├── page.tsx           # Listings page — SSR with searchParams
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Property detail — SSG + ISR
│   │   ├── neighborhoods/
│   │   │   └── [city]/
│   │   │       └── page.tsx       # City/neighborhood listings
│   │   ├── about/
│   │   │   └── page.tsx           # About Attila — SSG
│   │   └── contact/
│   │       └── page.tsx           # Contact form
│   │
│   ├── (admin)/                   # Admin route group
│   │   ├── layout.tsx             # Dashboard layout (sidebar + topbar)
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Overview stats
│   │   ├── dashboard/properties/
│   │   │   ├── page.tsx           # Properties table
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # Add property form
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx   # Edit property form
│   │   └── dashboard/media/
│   │       └── page.tsx           # Media library
│   │
│   ├── api/                       # Route handlers (when Supabase client-side isn't enough)
│   │   └── revalidate/
│   │       └── route.ts           # On-demand ISR trigger
│   │
│   ├── layout.tsx                 # Root layout (fonts, metadata, providers)
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                        # Primitive UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── toggle.tsx
│   │   ├── toast.tsx
│   │   ├── dropdown.tsx
│   │   └── skeleton.tsx           # Loading skeletons
│   │
│   ├── property/                  # Property-specific components
│   │   ├── property-card.tsx      # Card used on home + listings
│   │   ├── property-grid.tsx      # Grid/list layout with view toggle
│   │   ├── property-filters.tsx   # Filter bar (city, type, beds, price)
│   │   ├── property-sort.tsx      # Sort dropdown
│   │   ├── property-gallery.tsx   # Detail page image gallery
│   │   ├── property-stats.tsx     # Beds/baths/sqft stat row
│   │   ├── property-features.tsx  # Features & amenities grid
│   │   └── property-sidebar.tsx   # Detail page sidebar (price, agent, CTA)
│   │
│   ├── map/                       # Map components (all client-only)
│   │   ├── listings-map.tsx       # Split-view map with price markers
│   │   ├── detail-map.tsx         # Single property location map
│   │   ├── mini-map.tsx           # Sidebar preview map
│   │   └── map-provider.tsx       # Lazy-loads Leaflet, avoids SSR
│   │
│   ├── layout/                    # Structural components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx            # Admin sidebar
│   │   ├── topbar.tsx             # Admin topbar
│   │   └── mobile-nav.tsx         # Hamburger menu for mobile
│   │
│   ├── home/                      # Homepage sections
│   │   ├── hero.tsx
│   │   ├── stats-ribbon.tsx
│   │   ├── featured-properties.tsx
│   │   ├── about-section.tsx
│   │   └── neighborhoods-grid.tsx
│   │
│   ├── dashboard/                 # Admin-specific components
│   │   ├── stat-card.tsx
│   │   ├── recent-table.tsx
│   │   ├── activity-feed.tsx
│   │   ├── property-form.tsx      # Add/edit form (shared)
│   │   ├── image-uploader.tsx     # Drag-and-drop upload
│   │   ├── feature-tags.tsx       # Tag input for amenities
│   │   └── media-grid.tsx
│   │
│   └── seo/
│       └── structured-data.tsx    # JSON-LD for properties
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client (createBrowserClient)
│   │   ├── server.ts              # Server client (createServerClient)
│   │   ├── admin.ts               # Service-role client (admin operations only)
│   │   └── middleware.ts          # Auth session refresh
│   │
│   ├── queries/                   # Data access layer — all DB queries live here
│   │   ├── properties.ts          # getProperties, getPropertyBySlug, etc.
│   │   ├── media.ts               # getMediaItems, uploadMedia, etc.
│   │   └── analytics.ts           # getPropertyViews, getInquiryCount, etc.
│   │
│   ├── actions/                   # Server Actions (mutations)
│   │   ├── property-actions.ts    # createProperty, updateProperty, deleteProperty
│   │   ├── media-actions.ts       # uploadImage, deleteImage, setAsCover
│   │   └── inquiry-actions.ts     # submitInquiry
│   │
│   ├── utils.ts                   # Shared utilities (formatPrice, slugify, etc.)
│   ├── constants.ts               # City data, neighborhood lists, static config
│   └── types.ts                   # Shared TypeScript types
│
├── hooks/
│   ├── use-filters.ts             # URL-synced filter state
│   ├── use-map-sync.ts            # Bidirectional card ↔ marker hover sync
│   └── use-toast.ts               # Toast notification hook
│
└── styles/
    └── globals.css                # Tailwind directives + CSS variables + base styles
```

### Key Architectural Rules

1. **Server Components by default.** Only add `"use client"` when the component needs browser APIs (maps, event handlers, controlled inputs, hooks). Most page-level components and data-fetching components stay as Server Components.

2. **Data fetching belongs in `lib/queries/`.** Never call Supabase directly from components. Pages call query functions; components receive data via props. This makes data access testable and swappable.

3. **Mutations use Server Actions in `lib/actions/`.** Forms submit to Server Actions, not API routes. Use `revalidatePath` / `revalidateTag` after mutations to keep cached pages fresh.

4. **Maps are always client components.** Wrap Leaflet in a dynamic import with `{ ssr: false }` via `map-provider.tsx`. Never import Leaflet at the top level of a Server Component.

5. **URL is the source of truth for filters.** The listings page reads filters from `searchParams`. The filter UI updates the URL via `useRouter().push()`. This makes filtered views shareable and SEO-crawlable.

---

## Data Fetching Patterns

### Rendering Strategy Per Page

| Page | Strategy | Why |
|---|---|---|
| Homepage | **SSG** (`generateStaticParams` not needed, just static) | Content changes infrequently, maximum performance |
| Listings | **SSR** with `searchParams` | Filters change the content; must be dynamic |
| Property Detail | **SSG + ISR** (revalidate: 3600) | Individual pages are stable; ISR refreshes hourly |
| Neighborhoods | **SSG + ISR** | Same as detail pages |
| About / Contact | **SSG** | Fully static content |
| Dashboard (all) | **SSR** (dynamic, no cache) | Always shows latest data |

### Data Fetching Best Practices

```typescript
// GOOD: Fetch in Server Component, pass to Client Component
// app/(public)/properties/[slug]/page.tsx
export default async function PropertyPage({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();
  return <PropertyDetail property={property} />;
}

// GOOD: Parallel data fetching when independent
export default async function DashboardPage() {
  const [stats, recentProperties, activity] = await Promise.all([
    getDashboardStats(),
    getRecentProperties(5),
    getRecentActivity(10),
  ]);
  return <DashboardOverview stats={stats} recent={recentProperties} activity={activity} />;
}

// GOOD: Use searchParams for dynamic server rendering
export default async function ListingsPage({ searchParams }: Props) {
  const filters = parseFilters(searchParams);
  const properties = await getFilteredProperties(filters);
  return <ListingsView properties={properties} filters={filters} />;
}

// BAD: Fetching in client component when server fetch would work
// BAD: Waterfall fetches (await one, then await another that doesn't depend on it)
// BAD: Using useEffect + fetch for data that's available at render time
```

### Caching & Revalidation

- Use `fetch` with `next: { tags: ['properties'] }` in query functions so you can do targeted revalidation.
- After a Server Action mutates a property: call `revalidateTag('properties')` to bust the cache.
- For the admin dashboard: use `export const dynamic = 'force-dynamic'` since it always needs fresh data.
- For ISR pages: `export const revalidate = 3600` (1 hour) on property detail pages.

---

## SEO Strategy

### Metadata

Every public page exports a `generateMetadata` function:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  return {
    title: `${property.name} — ATTILA Real Estate`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.name,
      description: property.description.slice(0, 160),
      images: [{ url: property.images[0], width: 1200, height: 630 }],
      type: 'website',
    },
  };
}
```

### Structured Data (JSON-LD)

Every property detail page includes `RealEstateListing` schema:

```typescript
// components/seo/structured-data.tsx
export function PropertyJsonLd({ property }: { property: Property }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    image: property.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressRegion: property.neighborhood,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.lat,
      longitude: property.lng,
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency,
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.sqft,
      unitCode: 'FTK',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
```

### Sitemap & Robots

- Generate `sitemap.xml` dynamically from the database using `app/sitemap.ts`.
- `robots.txt` via `app/robots.ts` — allow all public pages, disallow `/dashboard/*`.

### URL Structure

| URL | Purpose |
|---|---|
| `/` | Homepage |
| `/properties` | All listings (filterable via query params) |
| `/properties/bosphorus-view-penthouse` | Property detail (slug-based) |
| `/properties?city=Istanbul&type=sale` | Filtered listings (crawlable) |
| `/neighborhoods/istanbul` | Istanbul properties |
| `/neighborhoods/bodrum` | Bodrum properties |
| `/about` | About Attila |
| `/contact` | Contact form |
| `/dashboard` | Admin overview (auth-gated) |
| `/dashboard/properties` | Manage properties |
| `/dashboard/properties/new` | Add property |
| `/dashboard/properties/[id]/edit` | Edit property |
| `/dashboard/media` | Media library |

---

## Mobile-First Design

### Principles

1. **Design mobile-first in Tailwind.** Base classes are for mobile; use `md:` and `lg:` breakpoints to add desktop layouts. Never write desktop-first then override down.

2. **Touch targets minimum 44×44px.** All buttons, links, and interactive elements must meet this size on mobile.

3. **Bottom-sheet patterns for mobile filters.** The filter bar on desktop becomes a slide-up bottom sheet on mobile, triggered by a floating filter button.

4. **Responsive image loading.** Use Next.js `<Image>` with `sizes` prop to serve appropriately sized images per viewport. Define art-direction breakpoints for hero images.

5. **Skeleton loading states.** Every data-dependent section shows a styled skeleton (matching the dark theme) during loading. Use `loading.tsx` files per route segment.

### Breakpoints (Tailwind defaults)

| Prefix | Min-width | Target |
|---|---|---|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

### Key Mobile Adaptations

- **Navbar:** Collapses to logo + hamburger. Mobile nav is a full-screen overlay with staggered animation.
- **Property grid:** 1 column on mobile, 2 on tablet, 3 on desktop.
- **Map view:** Stacks vertically on mobile (map on top, list below) instead of side-by-side.
- **Dashboard sidebar:** Off-canvas drawer on mobile, triggered by hamburger in topbar.
- **Image gallery:** Horizontal swipe carousel on mobile instead of grid.
- **Filters:** Bottom sheet modal on mobile instead of inline dropdowns.

---

## Database Schema (Supabase)

This is the canonical schema. All tables, indexes, policies, and storage buckets are defined here. Do not deviate from this structure without updating this document first.

### Tables

```sql
-- ═══════════════════════════════════════════════════════════════
-- PROPERTIES — Core listing data
-- ═══════════════════════════════════════════════════════════════
create table properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  city text not null check (city in ('Istanbul', 'Bodrum')),
  neighborhood text not null,
  full_address text not null,
  type text not null check (type in ('sale', 'rent')),
  price numeric not null,
  price_display text not null,         -- Formatted string: "$1.2M", "₺45,000"
  price_note text,                     -- "/month" for rentals, null for sales
  currency text not null default 'USD' check (currency in ('USD', 'TRY', 'EUR')),
  bedrooms int not null check (bedrooms >= 0),
  bathrooms int not null check (bathrooms >= 0),
  sqft int not null check (sqft > 0),
  year_built int,
  year_renovated int,
  lat double precision,
  lng double precision,
  description text not null,
  features text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'active', 'sold', 'rented')),
  featured boolean default false,
  allow_inquiries boolean default true,
  price_on_request boolean default false,
  views int default 0,
  agent_name text not null default 'Attila Utkucan',
  agent_title text not null default 'Founder & Agent',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- PROPERTY_IMAGES — Gallery images linked to properties
-- ═══════════════════════════════════════════════════════════════
create table property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  url text not null,                   -- Public URL (from Supabase Storage)
  storage_path text not null,          -- Path in the storage bucket for deletion
  is_cover boolean default false,
  alt_text text,
  sort_order int not null default 0,
  width int,
  height int,
  file_size int,                       -- Bytes
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- NEARBY_PLACES — POIs near each property (shown on detail page)
-- ═══════════════════════════════════════════════════════════════
create table nearby_places (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  icon text not null check (icon in ('tree', 'anchor', 'shop', 'train', 'walk', 'glass', 'landmark')),
  distance text not null,              -- "200m", "1.2km"
  sort_order int not null default 0
);

-- ═══════════════════════════════════════════════════════════════
-- INQUIRIES — Contact form submissions from public site
-- ═══════════════════════════════════════════════════════════════
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete set null,
  property_name text,                  -- Denormalized so it survives property deletion
  name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- MEDIA — Standalone media library (not tied to a property)
-- ═══════════════════════════════════════════════════════════════
create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  filename text not null,
  alt_text text,
  mime_type text not null,
  file_size int not null,              -- Bytes
  width int,
  height int,
  created_at timestamptz not null default now()
);
```

### Indexes

```sql
create index idx_properties_slug on properties(slug);
create index idx_properties_city on properties(city);
create index idx_properties_type on properties(type);
create index idx_properties_status on properties(status);
create index idx_properties_featured on properties(featured) where featured = true;
create index idx_properties_city_type on properties(city, type);
create index idx_properties_neighborhood on properties(neighborhood);
create index idx_properties_price on properties(price);

create index idx_property_images_property on property_images(property_id);
create index idx_property_images_cover on property_images(property_id) where is_cover = true;

create index idx_nearby_places_property on nearby_places(property_id);

create index idx_inquiries_property on inquiries(property_id);
create index idx_inquiries_status on inquiries(status);
create index idx_inquiries_created on inquiries(created_at desc);
```

### Triggers & Functions

```sql
-- Auto-update updated_at on property changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on properties
  for each row execute function update_updated_at();

-- Auto-generate slug from name (on insert if slug is empty)
create or replace function generate_slug()
returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug = lower(regexp_replace(
      regexp_replace(new.name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));
    -- Handle duplicates by appending a suffix
    if exists (select 1 from properties where slug = new.slug and id != new.id) then
      new.slug = new.slug || '-' || substr(gen_random_uuid()::text, 1, 8);
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger properties_generate_slug
  before insert or update on properties
  for each row execute function generate_slug();

-- Ensure only one cover image per property
create or replace function enforce_single_cover()
returns trigger as $$
begin
  if new.is_cover = true then
    update property_images
      set is_cover = false
      where property_id = new.property_id and id != new.id and is_cover = true;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger property_images_single_cover
  before insert or update on property_images
  for each row execute function enforce_single_cover();

-- Denormalize property_name into inquiries
create or replace function set_inquiry_property_name()
returns trigger as $$
begin
  if new.property_id is not null then
    select name into new.property_name from properties where id = new.property_id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger inquiries_set_property_name
  before insert on inquiries
  for each row execute function set_inquiry_property_name();
```

### Row Level Security

```sql
-- Properties
alter table properties enable row level security;

create policy "Anyone can read active properties"
  on properties for select
  using (status = 'active');

create policy "Authenticated users can read all properties"
  on properties for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert properties"
  on properties for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update properties"
  on properties for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete properties"
  on properties for delete
  using (auth.role() = 'authenticated');

-- Property Images
alter table property_images enable row level security;

create policy "Anyone can read property images"
  on property_images for select using (true);

create policy "Authenticated users manage images"
  on property_images for all
  using (auth.role() = 'authenticated');

-- Nearby Places
alter table nearby_places enable row level security;

create policy "Anyone can read nearby places"
  on nearby_places for select using (true);

create policy "Authenticated users manage nearby places"
  on nearby_places for all
  using (auth.role() = 'authenticated');

-- Inquiries
alter table inquiries enable row level security;

create policy "Anyone can submit inquiries"
  on inquiries for insert
  with check (true);

create policy "Authenticated users can read inquiries"
  on inquiries for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update inquiries"
  on inquiries for update
  using (auth.role() = 'authenticated');

-- Media
alter table media enable row level security;

create policy "Anyone can read media"
  on media for select using (true);

create policy "Authenticated users manage media"
  on media for all
  using (auth.role() = 'authenticated');
```

### Supabase Storage

```sql
-- Create the bucket for property images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-images',
  'property-images',
  true,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies
create policy "Public read access"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "Authenticated users can upload"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');
```

### TypeScript Types (lib/types.ts)

These types mirror the database schema exactly. All components use these types — never define ad-hoc property shapes.

```typescript
export type PropertyStatus = 'draft' | 'active' | 'sold' | 'rented';
export type PropertyType = 'sale' | 'rent';
export type Currency = 'USD' | 'TRY' | 'EUR';
export type City = 'Istanbul' | 'Bodrum';
export type NearbyIcon = 'tree' | 'anchor' | 'shop' | 'train' | 'walk' | 'glass' | 'landmark';
export type InquiryStatus = 'new' | 'read' | 'replied' | 'archived';

export type Property = {
  id: string;
  name: string;
  slug: string;
  city: City;
  neighborhood: string;
  fullAddress: string;
  type: PropertyType;
  price: number;
  priceDisplay: string;
  priceNote: string | null;
  currency: Currency;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number | null;
  yearRenovated: number | null;
  lat: number | null;
  lng: number | null;
  description: string;
  features: string[];
  status: PropertyStatus;
  featured: boolean;
  allowInquiries: boolean;
  priceOnRequest: boolean;
  views: number;
  agentName: string;
  agentTitle: string;
  createdAt: string;
  updatedAt: string;
};

export type PropertyWithImages = Property & {
  images: PropertyImage[];
  nearbyPlaces: NearbyPlace[];
};

export type PropertyImage = {
  id: string;
  propertyId: string;
  url: string;
  storagePath: string;
  isCover: boolean;
  altText: string | null;
  sortOrder: number;
  width: number | null;
  height: number | null;
  fileSize: number | null;
  createdAt: string;
};

export type NearbyPlace = {
  id: string;
  propertyId: string;
  name: string;
  icon: NearbyIcon;
  distance: string;
  sortOrder: number;
};

export type Inquiry = {
  id: string;
  propertyId: string | null;
  propertyName: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: InquiryStatus;
  createdAt: string;
};

export type MediaItem = {
  id: string;
  url: string;
  storagePath: string;
  filename: string;
  altText: string | null;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  createdAt: string;
};

// Form input types (for create/update operations)
export type PropertyInsert = Omit<Property, 'id' | 'slug' | 'views' | 'createdAt' | 'updatedAt'>;
export type PropertyUpdate = Partial<PropertyInsert>;
export type InquiryInsert = Omit<Inquiry, 'id' | 'propertyName' | 'status' | 'createdAt'>;
```

### Neighborhoods Reference

Static data — does not need a table. Defined in `lib/constants.ts`:

```typescript
export const NEIGHBORHOODS: Record<City, string[]> = {
  Istanbul: ['Beşiktaş', 'Kadıköy', 'Nişantaşı', 'Cihangir', 'Galata', 'Bebek', 'Üsküdar'],
  Bodrum: ['Yalıkavak', 'Göltürkbükü', 'Türkbükü', 'Bodrum Center'],
};

export const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  'Beşiktaş': { lat: 41.0432, lng: 29.0056 },
  'Kadıköy': { lat: 40.9823, lng: 29.0296 },
  'Nişantaşı': { lat: 41.0487, lng: 28.9949 },
  'Cihangir': { lat: 41.0322, lng: 28.9838 },
  'Galata': { lat: 41.0256, lng: 28.9743 },
  'Bebek': { lat: 41.0766, lng: 29.0434 },
  'Üsküdar': { lat: 41.0232, lng: 29.0151 },
  'Yalıkavak': { lat: 37.1036, lng: 27.2926 },
  'Göltürkbükü': { lat: 37.0936, lng: 27.3826 },
  'Türkbükü': { lat: 37.0956, lng: 27.3746 },
  'Bodrum Center': { lat: 37.0344, lng: 27.4305 },
};
```

### Query Examples (lib/queries/properties.ts)

```typescript
import { createServerClient } from '@/lib/supabase/server';
import type { Property, PropertyWithImages } from '@/lib/types';

export async function getActiveProperties(filters?: {
  city?: string;
  type?: string;
  neighborhood?: string;
  bedroomsMin?: number;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
}): Promise<Property[]> {
  const supabase = await createServerClient();
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'active');

  if (filters?.city) query = query.eq('city', filters.city);
  if (filters?.type) query = query.eq('type', filters.type);
  if (filters?.neighborhood) query = query.eq('neighborhood', filters.neighborhood);
  if (filters?.bedroomsMin) query = query.gte('bedrooms', filters.bedroomsMin);
  if (filters?.priceMin) query = query.gte('price', filters.priceMin);
  if (filters?.priceMax) query = query.lte('price', filters.priceMax);

  switch (filters?.sort) {
    case 'price-low': query = query.order('price', { ascending: true }); break;
    case 'price-high': query = query.order('price', { ascending: false }); break;
    case 'size': query = query.order('sqft', { ascending: false }); break;
    case 'beds': query = query.order('bedrooms', { ascending: false }); break;
    default: query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getPropertyBySlug(slug: string): Promise<PropertyWithImages | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      images:property_images(*, order:sort_order.asc),
      nearbyPlaces:nearby_places(*, order:sort_order.asc)
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getFeaturedProperties(limit = 8): Promise<Property[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
```

---

## Component Guidelines

### Naming

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Hooks: `use-kebab-case.ts`
- Utils/queries: `camelCase` functions in `kebab-case.ts` files

### Component Structure

```typescript
// 1. Types at top (or imported from lib/types.ts for shared types)
type PropertyCardProps = {
  property: Property;
  variant?: 'grid' | 'list';
};

// 2. Component
export function PropertyCard({ property, variant = 'grid' }: PropertyCardProps) {
  // hooks first, then derived state, then render
}
```

### Rules

- Props over context for data. Only use context for truly global concerns (theme, toast, auth).
- No prop drilling beyond 2 levels — if you're passing through an intermediate component that doesn't use the prop, restructure with composition or co-locate the data fetch closer to where it's needed.
- Collocate related files. If `property-card.tsx` needs a sub-component only it uses, put it in the same file or a `_components/` folder alongside it.
- Images always use `next/image` with explicit `width`/`height` or `fill` + `sizes`. Never use raw `<img>` tags.
- Links always use `next/link`. Never use `<a>` with `onClick` for navigation.

---

## Design Tokens

These CSS variables define the visual language. Set them in `globals.css` and reference via Tailwind's `theme.extend`:

```css
:root {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1917;
  --bg-card: #1e1d1b;
  --bg-elevated: #252422;
  --text-primary: #f2ece0;
  --text-secondary: #a09a8c;
  --text-muted: #6b6560;
  --accent: #c8a55c;
  --accent-hover: #dbb96f;
  --accent-muted: rgba(200, 165, 92, 0.15);
  --sage: #7a8c6e;
  --rose: #b07272;
  --blue: #6e8aab;
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Outfit', sans-serif;
}
```

### Fonts

- **Display (headings, prices, property names):** Cormorant Garamond — load via `next/font/google`, weights 300–700 + italic
- **Body (UI, labels, descriptions):** Outfit — load via `next/font/google`, weights 200–700

---

## Code Standards

- TypeScript strict mode. No `any`. Use explicit return types on exported functions.
- No default exports except for page/layout files (Next.js requires them).
- Prefer named exports for components: `export function PropertyCard()` not `export default function`.
- Keep components under 150 lines. Extract sub-components when a component grows.
- No comments explaining what code does. Only comment non-obvious *why*.
- No `console.log` in committed code. Use proper error handling.
- Format with Prettier (configured in project). Lint with ESLint (Next.js config + strict rules).

---

## Git Conventions

- Branch names: `feat/property-detail-page`, `fix/map-marker-alignment`, `refactor/filter-state`
- Commit messages: imperative mood, lowercase, under 72 chars. Example: `add property detail page with ISR`
- One feature per branch. Keep PRs focused and reviewable.

---

## Migration Order

Phase 1 — Foundation:
1. Initialize Next.js 15 project with TypeScript + Tailwind
2. Set up design tokens, fonts, global styles
3. Build UI primitives (`button`, `input`, `badge`, `skeleton`)
4. Build layout components (`navbar`, `footer`, `mobile-nav`)

Phase 2 — Public Pages (Static):
5. Homepage (hero, stats, featured grid, about, neighborhoods)
6. Property detail page with gallery, map, features
7. Listings page with filters, sort, grid/map toggle
8. About and Contact pages

Phase 3 — Supabase Integration:
9. Set up Supabase project, create schema, seed data
10. Replace static property array with database queries
11. Add ISR to detail pages, SSR to listings
12. Implement property slug generation and routing

Phase 4 — Admin Dashboard:
13. Build dashboard layout (sidebar, topbar)
14. Overview stats page
15. Properties table with search/filter
16. Add/edit property form with image upload to Supabase Storage
17. Media library

Phase 5 — Polish:
18. SEO (metadata, JSON-LD, sitemap, robots)
19. Mobile optimization pass
20. Loading states and error boundaries
21. Performance audit (Core Web Vitals)
