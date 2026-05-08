-- ═══════════════════════════════════════════════════════════════
-- ATTILA — Schema + 1 Property (Bosphorus View Penthouse)
-- Paste this entire file into the Supabase SQL Editor and run.
-- ═══════════════════════════════════════════════════════════════

-- ─── TABLES ───
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  city text not null check (city in ('Istanbul', 'Bodrum')),
  neighborhood text not null,
  full_address text not null,
  type text not null check (type in ('sale', 'rent')),
  price numeric not null,
  price_display text not null,
  price_note text,
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

create table if not exists property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  url text not null,
  storage_path text not null default '',
  is_cover boolean default false,
  alt_text text,
  sort_order int not null default 0,
  width int,
  height int,
  file_size int,
  created_at timestamptz not null default now()
);

create table if not exists nearby_places (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  icon text not null check (icon in ('tree', 'anchor', 'shop', 'train', 'walk', 'glass', 'landmark')),
  distance text not null,
  sort_order int not null default 0
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete set null,
  property_name text,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

-- ─── INDEXES ───
create index if not exists idx_properties_slug on properties(slug);
create index if not exists idx_properties_city on properties(city);
create index if not exists idx_properties_status on properties(status);
create index if not exists idx_property_images_property on property_images(property_id);
create index if not exists idx_nearby_places_property on nearby_places(property_id);

-- ─── TRIGGERS ───
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists properties_updated_at on properties;
create trigger properties_updated_at
  before update on properties
  for each row execute function update_updated_at();

create or replace function enforce_single_cover()
returns trigger as $$
begin
  if new.is_cover = true then
    update property_images set is_cover = false
      where property_id = new.property_id and id != new.id and is_cover = true;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists property_images_single_cover on property_images;
create trigger property_images_single_cover
  before insert or update on property_images
  for each row execute function enforce_single_cover();

-- ─── ROW LEVEL SECURITY ───
alter table properties enable row level security;
drop policy if exists "Anyone can read active properties" on properties;
create policy "Anyone can read active properties" on properties for select using (status = 'active');
drop policy if exists "Authenticated read all" on properties;
create policy "Authenticated read all" on properties for select using (auth.role() = 'authenticated');
drop policy if exists "Authenticated insert" on properties;
create policy "Authenticated insert" on properties for insert with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated update" on properties;
create policy "Authenticated update" on properties for update using (auth.role() = 'authenticated');
drop policy if exists "Authenticated delete" on properties;
create policy "Authenticated delete" on properties for delete using (auth.role() = 'authenticated');

alter table property_images enable row level security;
drop policy if exists "Anyone can read images" on property_images;
create policy "Anyone can read images" on property_images for select using (true);
drop policy if exists "Authenticated manage images" on property_images;
create policy "Authenticated manage images" on property_images for all using (auth.role() = 'authenticated');

alter table nearby_places enable row level security;
drop policy if exists "Anyone can read nearby" on nearby_places;
create policy "Anyone can read nearby" on nearby_places for select using (true);
drop policy if exists "Authenticated manage nearby" on nearby_places;
create policy "Authenticated manage nearby" on nearby_places for all using (auth.role() = 'authenticated');

alter table inquiries enable row level security;
drop policy if exists "Anyone can submit" on inquiries;
create policy "Anyone can submit" on inquiries for insert with check (true);
drop policy if exists "Authenticated read inquiries" on inquiries;
create policy "Authenticated read inquiries" on inquiries for select using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════
-- SEED: One property — Bosphorus View Penthouse
-- ═══════════════════════════════════════════════════════════════

insert into properties (
  name, slug, city, neighborhood, full_address, type, price, price_display,
  currency, bedrooms, bathrooms, sqft, year_built, lat, lng, description,
  features, status, featured, views
) values (
  'Bosphorus View Penthouse',
  'bosphorus-view-penthouse',
  'Istanbul',
  'Beşiktaş',
  'Kuruçeşme Cad. 42, Beşiktaş, Istanbul',
  'sale',
  1200000,
  '$1.2M',
  'USD',
  4, 3, 3200,
  2019,
  41.0472, 29.0302,
  'Commanding uninterrupted views of the Bosphorus strait from Kuruçeşme''s most coveted stretch, this penthouse occupies the top two floors of a contemporary waterfront residence. Floor-to-ceiling glass frames the passing ships, the Asian shore, and the illuminated minarets of Üsküdar at dusk. The open-plan living space flows onto a wraparound terrace — ideal for hosting against Istanbul''s most dramatic backdrop. Interiors blend polished concrete with warm walnut paneling and Aegean marble throughout.',
  '{"Bosphorus Views","Wraparound Terrace","Private Elevator","Smart Home","Underfloor Heating","2 Parking Spots","Concierge","Gym Access"}',
  'active',
  true,
  412
);

-- Images
insert into property_images (property_id, url, is_cover, sort_order)
select id, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', true, 0
from properties where slug = 'bosphorus-view-penthouse';

insert into property_images (property_id, url, is_cover, sort_order)
select id, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80', false, 1
from properties where slug = 'bosphorus-view-penthouse';

insert into property_images (property_id, url, is_cover, sort_order)
select id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', false, 2
from properties where slug = 'bosphorus-view-penthouse';

-- Nearby places
insert into nearby_places (property_id, name, icon, distance, sort_order)
select id, 'Kuruçeşme Park', 'tree', '200m', 0
from properties where slug = 'bosphorus-view-penthouse';

insert into nearby_places (property_id, name, icon, distance, sort_order)
select id, 'Bosphorus Ferry', 'anchor', '500m', 1
from properties where slug = 'bosphorus-view-penthouse';

insert into nearby_places (property_id, name, icon, distance, sort_order)
select id, 'Beşiktaş Market', 'shop', '1.2km', 2
from properties where slug = 'bosphorus-view-penthouse';

-- ═══════════════════════════════════════════════════════════════
-- Done! You should see:
-- ✓ 4 tables created (properties, property_images, nearby_places, inquiries)
-- ✓ 1 property inserted (Bosphorus View Penthouse)
-- ✓ 3 images + 3 nearby places linked
-- ═══════════════════════════════════════════════════════════════
