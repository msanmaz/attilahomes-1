-- ═══════════════════════════════════════════════════════════════
-- SEED: Remaining 11 properties (run after setup-one-property.sql)
-- ═══════════════════════════════════════════════════════════════

insert into properties (name, slug, city, neighborhood, full_address, type, price, price_display, price_note, currency, bedrooms, bathrooms, sqft, year_built, year_renovated, lat, lng, description, features, status, featured, views) values
('Renovated Heritage Apartment', 'renovated-heritage-apartment', 'Istanbul', 'Kadıköy', 'Caferağa Mah. Moda Cad. 18, Kadıköy, Istanbul', 'sale', 8500000, '₺8.5M', null, 'TRY', 3, 2, 1800, 1920, 2023, 40.9876, 29.0245, 'A ground-up renovation in the heart of Moda, this apartment transforms a 1920s Armenian-era building into a contemporary residence that respects its bones.', '{"Period Restoration","Chef''s Kitchen","High Ceilings","Hardwood Floors","Wine Niche","Near Ferry","Balcony","Storage"}', 'active', true, 287),
('Art Deco Residence', 'art-deco-residence', 'Istanbul', 'Nişantaşı', 'Abdi İpekçi Cad. 7, Nişantaşı, Istanbul', 'sale', 650000, '$650K', null, 'USD', 2, 2, 1400, 1930, 2022, 41.0487, 28.9942, 'In Istanbul''s most refined shopping district, this art deco apartment occupies the third floor of a 1930s landmark building.', '{"Art Deco Details","Terrazzo Floors","South Balcony","Marble Baths","Central Location","Elevator","Cellar","Doorman"}', 'active', true, 356),
('Bohemian Loft', 'bohemian-loft', 'Istanbul', 'Cihangir', 'Akarsu Cad. 22, Cihangir, Istanbul', 'rent', 45000, '₺45,000', '/month', 'TRY', 2, 1, 1200, null, 2021, 41.0322, 28.9838, 'Perched above Cihangir''s café-lined slopes with a sliver of Golden Horn view, this fully furnished loft captures the neighborhood''s creative energy.', '{"Furnished","Golden Horn View","Exposed Brick","Pet Friendly","Café District","Washer/Dryer","Gas Heating","Rooftop Access"}', 'active', true, 198),
('Galata Tower Apartment', 'galata-tower-apartment', 'Istanbul', 'Galata', 'Galip Dede Cad. 9, Galata, Istanbul', 'rent', 38000, '₺38,000', '/month', 'TRY', 1, 1, 850, null, 2020, 41.0256, 28.9743, 'A compact jewel in the shadow of the Galata Tower, this character apartment sits in a restored Genoese-era building.', '{"Historic Building","Vaulted Ceilings","Tower Views","Furnished","Central Location","Quiet Street","Character Details","Laundry"}', 'active', false, 143),
('Bebek Waterfront Residence', 'bebek-waterfront-residence', 'Istanbul', 'Bebek', 'Bebek Mah. Cevdetpaşa Cad. 55, Bebek, Istanbul', 'rent', 4500, '$4,500', '/month', 'USD', 3, 2, 2200, null, null, 41.0766, 29.0434, 'On Bebek''s storied waterfront — where Ottoman-era yalıs meet contemporary residences — this apartment offers Bosphorus proximity and village calm.', '{"Bosphorus Proximity","Bay Window","3 Bedrooms","Parking","24/7 Security","Near Cafés","University Area","Furnished Option"}', 'active', false, 521),
('Modern Üsküdar Flat', 'modern-uskudar-flat', 'Istanbul', 'Üsküdar', 'Kısıklı Cad. 12, Üsküdar, Istanbul', 'rent', 32000, '₺32,000', '/month', 'TRY', 2, 1, 1100, 2023, null, 41.0232, 29.0151, 'A bright, newly finished flat on the Asian side offering a quieter rhythm of Istanbul life.', '{"New Build","Compound Living","Shared Pool","Underground Parking","Gardens","Near Metro","Balcony","Storage Unit"}', 'active', false, 89),
('Renovated Beşiktaş Duplex', 'renovated-besiktas-duplex', 'Istanbul', 'Beşiktaş', 'Sinanpaşa Mah. Ihlamur Cad. 31, Beşiktaş, Istanbul', 'sale', 12000000, '₺12M', null, 'TRY', 3, 2, 2000, null, 2024, 41.0432, 29.0036, 'A duplex renovation showcasing Attila''s signature style — stripped back to the structure and rebuilt with intention.', '{"Full Renovation","Duplex Layout","Exposed Stone","Steel Staircase","Near Market","Mezzanine","Concrete Kitchen","Gas Heating"}', 'active', false, 189),
('Aegean Hilltop Villa', 'aegean-hilltop-villa', 'Bodrum', 'Yalıkavak', 'Tilkicik Koyu Mevkii, Yalıkavak, Bodrum', 'sale', 2800000, '$2.8M', null, 'USD', 5, 4, 4800, 2020, null, 37.1036, 27.2926, 'Crowning a private hillside above Yalıkavak marina, this villa commands 180-degree views of the Aegean.', '{"Infinity Pool","Sea Views","Hammam & Gym","Wine Room","5 Terraces","Private Garden","Parking","Near Marina"}', 'active', true, 634),
('Göltürkbükü Sea-View Villa', 'golturkbuku-sea-view-villa', 'Bodrum', 'Göltürkbükü', 'Göltürkbükü Mah. Deniz Sok. 5, Bodrum', 'sale', 1900000, '$1.9M', null, 'USD', 4, 3, 3500, 2018, null, 37.0936, 27.3826, 'Set above the twin bays of Göltürkbükü — Bodrum''s most sought-after summer address.', '{"Bay Views","Pool","Beach Access","Retractable Glass","Garden","Outdoor Lounge","4 Balconies","Near Beach Club"}', 'active', true, 445),
('Türkbükü Holiday Villa', 'turkbuku-holiday-villa', 'Bodrum', 'Türkbükü', 'Türkbükü Mah. Atatürk Cad. 14, Bodrum', 'rent', 8000, '$8,000', '/month', 'USD', 4, 3, 3000, null, 2022, 37.0956, 27.3746, 'A turnkey summer retreat in Türkbükü''s quieter hillside, fully furnished for seasonal living.', '{"Seasonal Rental","Heated Pool","Furnished","Olive Garden","Outdoor Dining","Sea Glimpses","BBQ Area","Parking"}', 'active', false, 312),
('Renovated Stone House', 'renovated-stone-house', 'Bodrum', 'Bodrum Center', 'Eski Çeşme Mah. Neyzen Tevfik Cad. 28, Bodrum', 'sale', 420000, '$420K', null, 'USD', 3, 2, 1600, null, 2023, 37.0344, 27.4305, 'A traditional Bodrum stone house — tangerine tree in the courtyard, whitewashed walls two feet thick, blue wooden shutters.', '{"Stone Construction","Courtyard","Full Renovation","Near Castle","Heated Floors","Blue Shutters","Tangerine Tree","Walk to Marina"}', 'active', true, 98);

-- Images for all 11 new properties
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', true, 0 from properties where slug='renovated-heritage-apartment';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80', false, 1 from properties where slug='renovated-heritage-apartment';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80', false, 2 from properties where slug='renovated-heritage-apartment';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', true, 0 from properties where slug='art-deco-residence';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', false, 1 from properties where slug='art-deco-residence';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80', false, 2 from properties where slug='art-deco-residence';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', true, 0 from properties where slug='bohemian-loft';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80', false, 1 from properties where slug='bohemian-loft';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80', false, 2 from properties where slug='bohemian-loft';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', true, 0 from properties where slug='galata-tower-apartment';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80', false, 1 from properties where slug='galata-tower-apartment';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', true, 0 from properties where slug='bebek-waterfront-residence';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80', false, 1 from properties where slug='bebek-waterfront-residence';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80', true, 0 from properties where slug='modern-uskudar-flat';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80', false, 1 from properties where slug='modern-uskudar-flat';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', true, 0 from properties where slug='renovated-besiktas-duplex';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80', false, 1 from properties where slug='renovated-besiktas-duplex';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', true, 0 from properties where slug='aegean-hilltop-villa';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80', false, 1 from properties where slug='aegean-hilltop-villa';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=900&q=80', false, 2 from properties where slug='aegean-hilltop-villa';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80', true, 0 from properties where slug='golturkbuku-sea-view-villa';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', false, 1 from properties where slug='golturkbuku-sea-view-villa';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', true, 0 from properties where slug='turkbuku-holiday-villa';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80', false, 1 from properties where slug='turkbuku-holiday-villa';

insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', true, 0 from properties where slug='renovated-stone-house';
insert into property_images (property_id, url, is_cover, sort_order) select id, 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80', false, 1 from properties where slug='renovated-stone-house';

-- Nearby places for key properties
insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Moda Promenade', 'walk', '150m', 0 from properties where slug='renovated-heritage-apartment';
insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Kadıköy Ferry', 'anchor', '600m', 1 from properties where slug='renovated-heritage-apartment';

insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Abdi İpekçi Cad.', 'shop', '50m', 0 from properties where slug='art-deco-residence';
insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Maçka Park', 'tree', '400m', 1 from properties where slug='art-deco-residence';

insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Galata Tower', 'landmark', '80m', 0 from properties where slug='galata-tower-apartment';

insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Yalıkavak Marina', 'anchor', '1.2km', 0 from properties where slug='aegean-hilltop-villa';
insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Tilkicik Beach', 'walk', '800m', 1 from properties where slug='aegean-hilltop-villa';

insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Bodrum Castle', 'landmark', '400m', 0 from properties where slug='renovated-stone-house';
insert into nearby_places (property_id, name, icon, distance, sort_order) select id, 'Bodrum Marina', 'anchor', '500m', 1 from properties where slug='renovated-stone-house';

-- ═══════════════════════════════════════════════════════════════
-- Done! You should now have 12 total properties in the database.
-- ═══════════════════════════════════════════════════════════════
