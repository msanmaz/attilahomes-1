-- ═══════════════════════════════════════════════════════════════
-- ATTILA Real Estate — Full Database Schema
-- Run this in the Supabase SQL editor to set up the database.
-- ═══════════════════════════════════════════════════════════════

-- TABLES
create table properties (
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

create table property_images (
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

create table nearby_places (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  icon text not null check (icon in ('tree', 'anchor', 'shop', 'train', 'walk', 'glass', 'landmark')),
  distance text not null,
  sort_order int not null default 0
);

create table inquiries (
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

create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  filename text not null,
  alt_text text,
  mime_type text not null,
  file_size int not null,
  width int,
  height int,
  created_at timestamptz not null default now()
);

-- INDEXES
create index idx_properties_slug on properties(slug);
create index idx_properties_city on properties(city);
create index idx_properties_type on properties(type);
create index idx_properties_status on properties(status);
create index idx_properties_featured on properties(featured) where featured = true;
create index idx_properties_city_type on properties(city, type);
create index idx_properties_price on properties(price);
create index idx_property_images_property on property_images(property_id);
create index idx_property_images_cover on property_images(property_id) where is_cover = true;
create index idx_nearby_places_property on nearby_places(property_id);
create index idx_inquiries_status on inquiries(status);
create index idx_inquiries_created on inquiries(created_at desc);

-- TRIGGERS
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

create or replace function generate_slug()
returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug = lower(regexp_replace(
      regexp_replace(new.name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));
    if exists (select 1 from properties where slug = new.slug and id != coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)) then
      new.slug = new.slug || '-' || substr(gen_random_uuid()::text, 1, 8);
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger properties_generate_slug
  before insert or update on properties
  for each row execute function generate_slug();

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

create trigger property_images_single_cover
  before insert or update on property_images
  for each row execute function enforce_single_cover();

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

-- ROW LEVEL SECURITY
alter table properties enable row level security;
create policy "Anyone can read active properties" on properties for select using (status = 'active');
create policy "Authenticated read all" on properties for select using (auth.role() = 'authenticated');
create policy "Authenticated insert" on properties for insert with check (auth.role() = 'authenticated');
create policy "Authenticated update" on properties for update using (auth.role() = 'authenticated');
create policy "Authenticated delete" on properties for delete using (auth.role() = 'authenticated');

alter table property_images enable row level security;
create policy "Anyone can read images" on property_images for select using (true);
create policy "Authenticated manage images" on property_images for all using (auth.role() = 'authenticated');

alter table nearby_places enable row level security;
create policy "Anyone can read nearby" on nearby_places for select using (true);
create policy "Authenticated manage nearby" on nearby_places for all using (auth.role() = 'authenticated');

alter table inquiries enable row level security;
create policy "Anyone can submit" on inquiries for insert with check (true);
create policy "Authenticated read inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "Authenticated update inquiries" on inquiries for update using (auth.role() = 'authenticated');

alter table media enable row level security;
create policy "Anyone can read media" on media for select using (true);
create policy "Authenticated manage media" on media for all using (auth.role() = 'authenticated');

-- STORAGE
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-images', 'property-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "Public read storage" on storage.objects for select using (bucket_id = 'property-images');
create policy "Auth upload storage" on storage.objects for insert with check (bucket_id = 'property-images' and auth.role() = 'authenticated');
create policy "Auth delete storage" on storage.objects for delete using (bucket_id = 'property-images' and auth.role() = 'authenticated');
