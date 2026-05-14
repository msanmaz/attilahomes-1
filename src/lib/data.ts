import type { PropertyWithImages } from "./types";

export const properties: PropertyWithImages[] = [
  {
    id: "1", name: "Bosphorus View Penthouse", slug: "bosphorus-view-penthouse",
    city: "Istanbul", neighborhood: "Beşiktaş", fullAddress: "Kuruçeşme Cad. 42, Beşiktaş, Istanbul",
    type: "sale", price: 1200000, priceDisplay: "$1.2M", priceNote: null, currency: "USD",
    bedrooms: 4, bathrooms: 3, sqft: 3200, netSqm: null, brutSqm: null, yearBuilt: 2019, yearRenovated: null,
    lat: 41.0472, lng: 29.0302,
    description: "Commanding uninterrupted views of the Bosphorus strait from Kuruçeşme's most coveted stretch, this penthouse occupies the top two floors of a contemporary waterfront residence. Floor-to-ceiling glass frames the passing ships, the Asian shore, and the illuminated minarets of Üsküdar at dusk. The open-plan living space flows onto a wraparound terrace — ideal for hosting against Istanbul's most dramatic backdrop. Interiors blend polished concrete with warm walnut paneling and Aegean marble throughout.",
    features: ["Bosphorus Views", "Wraparound Terrace", "Private Elevator", "Smart Home", "Underfloor Heating", "2 Parking Spots", "Concierge", "Gym Access"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 412,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-01-15", updatedAt: "2024-01-15",
    images: [
      { id: "i1", propertyId: "1", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i2", propertyId: "1", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i3", propertyId: "1", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n1", propertyId: "1", name: "Kuruçeşme Park", icon: "tree", distance: "200m", sortOrder: 0 },
      { id: "n2", propertyId: "1", name: "Bosphorus Ferry", icon: "anchor", distance: "500m", sortOrder: 1 },
      { id: "n3", propertyId: "1", name: "Beşiktaş Market", icon: "shop", distance: "1.2km", sortOrder: 2 },
    ],
  },
  {
    id: "2", name: "Renovated Heritage Apartment", slug: "renovated-heritage-apartment",
    city: "Istanbul", neighborhood: "Kadıköy", fullAddress: "Caferağa Mah. Moda Cad. 18, Kadıköy, Istanbul",
    type: "sale", price: 8500000, priceDisplay: "₺8.5M", priceNote: null, currency: "TRY",
    bedrooms: 3, bathrooms: 2, sqft: 1800, netSqm: null, brutSqm: null, yearBuilt: 1920, yearRenovated: 2023,
    lat: 40.9876, lng: 29.0245,
    description: "A ground-up renovation in the heart of Moda, this apartment transforms a 1920s Armenian-era building into a contemporary residence that respects its bones. Original ceiling rosettes and hardwood floors have been restored; new elements — a chef's kitchen with Smeg appliances, walk-in rainfall showers, and a climate-controlled wine niche — are woven in without erasing the building's story.",
    features: ["Period Restoration", "Chef's Kitchen", "High Ceilings", "Hardwood Floors", "Wine Niche", "Near Ferry", "Balcony", "Storage"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 287,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-02-01", updatedAt: "2024-02-01",
    images: [
      { id: "i4", propertyId: "2", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i5", propertyId: "2", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i6", propertyId: "2", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n4", propertyId: "2", name: "Moda Promenade", icon: "walk", distance: "150m", sortOrder: 0 },
      { id: "n5", propertyId: "2", name: "Kadıköy Ferry", icon: "anchor", distance: "600m", sortOrder: 1 },
      { id: "n6", propertyId: "2", name: "Barlar Sokağı", icon: "glass", distance: "300m", sortOrder: 2 },
    ],
  },
  {
    id: "3", name: "Art Deco Residence", slug: "art-deco-residence",
    city: "Istanbul", neighborhood: "Nişantaşı", fullAddress: "Abdi İpekçi Cad. 7, Nişantaşı, Istanbul",
    type: "sale", price: 650000, priceDisplay: "$650K", priceNote: null, currency: "USD",
    bedrooms: 2, bathrooms: 2, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: 1930, yearRenovated: 2022,
    lat: 41.0487, lng: 28.9942,
    description: "In Istanbul's most refined shopping district, this art deco apartment occupies the third floor of a 1930s landmark building. Geometric ironwork, terrazzo floors, and arched doorways have been preserved through a meticulous renovation.",
    features: ["Art Deco Details", "Terrazzo Floors", "South Balcony", "Marble Baths", "Central Location", "Elevator", "Cellar", "Doorman"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 356,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-02-10", updatedAt: "2024-02-10",
    images: [
      { id: "i7", propertyId: "3", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i8", propertyId: "3", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i9", propertyId: "3", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n7", propertyId: "3", name: "Abdi İpekçi Cad.", icon: "shop", distance: "50m", sortOrder: 0 },
      { id: "n8", propertyId: "3", name: "Maçka Park", icon: "tree", distance: "400m", sortOrder: 1 },
      { id: "n9", propertyId: "3", name: "Nişantaşı Metro", icon: "train", distance: "250m", sortOrder: 2 },
    ],
  },
  {
    id: "4", name: "Bohemian Loft", slug: "bohemian-loft",
    city: "Istanbul", neighborhood: "Cihangir", fullAddress: "Akarsu Cad. 22, Cihangir, Istanbul",
    type: "rent", price: 45000, priceDisplay: "₺45,000", priceNote: "/month", currency: "TRY",
    bedrooms: 2, bathrooms: 1, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: 2021,
    lat: 41.0322, lng: 28.9838,
    description: "Perched above Cihangir's café-lined slopes with a sliver of Golden Horn view, this fully furnished loft captures the neighborhood's creative energy. Exposed brick walls, steel-framed windows, and polished concrete floors create an industrial canvas softened by vintage Turkish kilims.",
    features: ["Furnished", "Golden Horn View", "Exposed Brick", "Pet Friendly", "Café District", "Washer/Dryer", "Gas Heating", "Rooftop Access"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 198,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-03-01", updatedAt: "2024-03-01",
    images: [
      { id: "i10", propertyId: "4", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i11", propertyId: "4", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i12", propertyId: "4", url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n10", propertyId: "4", name: "Firuzağa Mosque", icon: "landmark", distance: "100m", sortOrder: 0 },
      { id: "n11", propertyId: "4", name: "Cihangir Cafés", icon: "glass", distance: "50m", sortOrder: 1 },
      { id: "n12", propertyId: "4", name: "Taksim Square", icon: "train", distance: "800m", sortOrder: 2 },
    ],
  },
  {
    id: "5", name: "Galata Tower Apartment", slug: "galata-tower-apartment",
    city: "Istanbul", neighborhood: "Galata", fullAddress: "Galip Dede Cad. 9, Galata, Istanbul",
    type: "rent", price: 38000, priceDisplay: "₺38,000", priceNote: "/month", currency: "TRY",
    bedrooms: 1, bathrooms: 1, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: 2020,
    lat: 41.0256, lng: 28.9743,
    description: "A compact jewel in the shadow of the Galata Tower, this character apartment sits in a restored Genoese-era building on one of Istanbul's most atmospheric streets.",
    features: ["Historic Building", "Vaulted Ceilings", "Tower Views", "Furnished", "Central Location", "Quiet Street", "Character Details", "Laundry"],
    status: "active", featured: false, allowInquiries: true, priceOnRequest: false, views: 143,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-03-15", updatedAt: "2024-03-15",
    images: [
      { id: "i13", propertyId: "5", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i14", propertyId: "5", url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i15", propertyId: "5", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n13", propertyId: "5", name: "Galata Tower", icon: "landmark", distance: "80m", sortOrder: 0 },
      { id: "n14", propertyId: "5", name: "Karaköy Tram", icon: "train", distance: "400m", sortOrder: 1 },
      { id: "n15", propertyId: "5", name: "SALT Galata", icon: "landmark", distance: "350m", sortOrder: 2 },
    ],
  },
  {
    id: "6", name: "Bebek Waterfront Residence", slug: "bebek-waterfront-residence",
    city: "Istanbul", neighborhood: "Bebek", fullAddress: "Bebek Mah. Cevdetpaşa Cad. 55, Bebek, Istanbul",
    type: "rent", price: 4500, priceDisplay: "$4,500", priceNote: "/month", currency: "USD",
    bedrooms: 3, bathrooms: 2, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: null,
    lat: 41.0766, lng: 29.0434,
    description: "On Bebek's storied waterfront — where Ottoman-era yalıs meet contemporary residences — this apartment offers the rare combination of Bosphorus proximity and village calm.",
    features: ["Bosphorus Proximity", "Bay Window", "3 Bedrooms", "Parking", "24/7 Security", "Near Cafés", "University Area", "Furnished Option"],
    status: "active", featured: false, allowInquiries: true, priceOnRequest: false, views: 521,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-04-01", updatedAt: "2024-04-01",
    images: [
      { id: "i16", propertyId: "6", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i17", propertyId: "6", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i18", propertyId: "6", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n16", propertyId: "6", name: "Bebek Sahil", icon: "walk", distance: "50m", sortOrder: 0 },
      { id: "n17", propertyId: "6", name: "Boğaziçi Uni", icon: "landmark", distance: "800m", sortOrder: 1 },
      { id: "n18", propertyId: "6", name: "Rumeli Hisarı", icon: "landmark", distance: "1.5km", sortOrder: 2 },
    ],
  },
  {
    id: "7", name: "Modern Üsküdar Flat", slug: "modern-uskudar-flat",
    city: "Istanbul", neighborhood: "Üsküdar", fullAddress: "Kısıklı Cad. 12, Üsküdar, Istanbul",
    type: "rent", price: 32000, priceDisplay: "₺32,000", priceNote: "/month", currency: "TRY",
    bedrooms: 2, bathrooms: 1, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: 2023, yearRenovated: null,
    lat: 41.0232, lng: 29.0151,
    description: "A bright, newly finished flat on the Asian side offering a quieter rhythm of Istanbul life. Clean lines, engineered oak floors, and a minimalist kitchen with integrated appliances.",
    features: ["New Build", "Compound Living", "Shared Pool", "Underground Parking", "Gardens", "Near Metro", "Balcony", "Storage Unit"],
    status: "active", featured: false, allowInquiries: true, priceOnRequest: false, views: 89,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-04-10", updatedAt: "2024-04-10",
    images: [
      { id: "i19", propertyId: "7", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i20", propertyId: "7", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i21", propertyId: "7", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n19", propertyId: "7", name: "Üsküdar Ferry", icon: "anchor", distance: "2km", sortOrder: 0 },
      { id: "n20", propertyId: "7", name: "Fethi Paşa Park", icon: "tree", distance: "500m", sortOrder: 1 },
      { id: "n21", propertyId: "7", name: "Üsküdar Metro", icon: "train", distance: "1.5km", sortOrder: 2 },
    ],
  },
  {
    id: "8", name: "Renovated Beşiktaş Duplex", slug: "renovated-besiktas-duplex",
    city: "Istanbul", neighborhood: "Beşiktaş", fullAddress: "Sinanpaşa Mah. Ihlamur Cad. 31, Beşiktaş, Istanbul",
    type: "sale", price: 12000000, priceDisplay: "₺12M", priceNote: null, currency: "TRY",
    bedrooms: 3, bathrooms: 2, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: 2024,
    lat: 41.0432, lng: 29.0036,
    description: "A duplex renovation showcasing Attila's signature style — stripped back to the structure and rebuilt with intention.",
    features: ["Full Renovation", "Duplex Layout", "Exposed Stone", "Steel Staircase", "Near Market", "Mezzanine", "Concrete Kitchen", "Gas Heating"],
    status: "active", featured: false, allowInquiries: true, priceOnRequest: false, views: 189,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-05-01", updatedAt: "2024-05-01",
    images: [
      { id: "i22", propertyId: "8", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i23", propertyId: "8", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i24", propertyId: "8", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n22", propertyId: "8", name: "Beşiktaş Çarşı", icon: "shop", distance: "300m", sortOrder: 0 },
      { id: "n23", propertyId: "8", name: "Dolmabahçe Palace", icon: "landmark", distance: "600m", sortOrder: 1 },
      { id: "n24", propertyId: "8", name: "BJK Stadium", icon: "landmark", distance: "400m", sortOrder: 2 },
    ],
  },
  {
    id: "9", name: "Aegean Hilltop Villa", slug: "aegean-hilltop-villa",
    city: "Bodrum", neighborhood: "Yalıkavak", fullAddress: "Tilkicik Koyu Mevkii, Yalıkavak, Bodrum",
    type: "sale", price: 2800000, priceDisplay: "$2.8M", priceNote: null, currency: "USD",
    bedrooms: 5, bathrooms: 4, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: 2020, yearRenovated: null,
    lat: 37.1036, lng: 27.2926,
    description: "Crowning a private hillside above Yalıkavak marina, this villa commands 180-degree views of the Aegean — from the Greek islands on the horizon to the turquoise bays below.",
    features: ["Infinity Pool", "Sea Views", "Hammam & Gym", "Wine Room", "5 Terraces", "Private Garden", "Parking", "Near Marina"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 634,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-05-15", updatedAt: "2024-05-15",
    images: [
      { id: "i25", propertyId: "9", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i26", propertyId: "9", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i27", propertyId: "9", url: "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n25", propertyId: "9", name: "Yalıkavak Marina", icon: "anchor", distance: "1.2km", sortOrder: 0 },
      { id: "n26", propertyId: "9", name: "Tilkicik Beach", icon: "walk", distance: "800m", sortOrder: 1 },
      { id: "n27", propertyId: "9", name: "Village Center", icon: "shop", distance: "2km", sortOrder: 2 },
    ],
  },
  {
    id: "10", name: "Göltürkbükü Sea-View Villa", slug: "golturkbuku-sea-view-villa",
    city: "Bodrum", neighborhood: "Göltürkbükü", fullAddress: "Göltürkbükü Mah. Deniz Sok. 5, Bodrum",
    type: "sale", price: 1900000, priceDisplay: "$1.9M", priceNote: null, currency: "USD",
    bedrooms: 4, bathrooms: 3, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: 2018, yearRenovated: null,
    lat: 37.0936, lng: 27.3826,
    description: "Set above the twin bays of Göltürkbükü — Bodrum's most sought-after summer address — this contemporary villa pairs clean Mediterranean lines with lush subtropical landscaping.",
    features: ["Bay Views", "Pool", "Beach Access", "Retractable Glass", "Garden", "Outdoor Lounge", "4 Balconies", "Near Beach Club"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 445,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-06-01", updatedAt: "2024-06-01",
    images: [
      { id: "i28", propertyId: "10", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i29", propertyId: "10", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i30", propertyId: "10", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n28", propertyId: "10", name: "Göltürkbükü Beach", icon: "walk", distance: "400m", sortOrder: 0 },
      { id: "n29", propertyId: "10", name: "Beach Club", icon: "glass", distance: "500m", sortOrder: 1 },
      { id: "n30", propertyId: "10", name: "Türkbükü Center", icon: "shop", distance: "1.5km", sortOrder: 2 },
    ],
  },
  {
    id: "11", name: "Türkbükü Holiday Villa", slug: "turkbuku-holiday-villa",
    city: "Bodrum", neighborhood: "Türkbükü", fullAddress: "Türkbükü Mah. Atatürk Cad. 14, Bodrum",
    type: "rent", price: 8000, priceDisplay: "$8,000", priceNote: "/month", currency: "USD",
    bedrooms: 4, bathrooms: 3, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: 2022,
    lat: 37.0956, lng: 27.3746,
    description: "A turnkey summer retreat in Türkbükü's quieter hillside, fully furnished for seasonal living. Bougainvillea-draped terraces wrap the whitewashed structure.",
    features: ["Seasonal Rental", "Heated Pool", "Furnished", "Olive Garden", "Outdoor Dining", "Sea Glimpses", "BBQ Area", "Parking"],
    status: "active", featured: false, allowInquiries: true, priceOnRequest: false, views: 312,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-06-15", updatedAt: "2024-06-15",
    images: [
      { id: "i31", propertyId: "11", url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i32", propertyId: "11", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i33", propertyId: "11", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n31", propertyId: "11", name: "Türkbükü Beach", icon: "walk", distance: "600m", sortOrder: 0 },
      { id: "n32", propertyId: "11", name: "Macakızı Hotel", icon: "landmark", distance: "800m", sortOrder: 1 },
      { id: "n33", propertyId: "11", name: "Bodrum Center", icon: "shop", distance: "12km", sortOrder: 2 },
    ],
  },
  {
    id: "12", name: "Renovated Stone House", slug: "renovated-stone-house",
    city: "Bodrum", neighborhood: "Bodrum Center", fullAddress: "Eski Çeşme Mah. Neyzen Tevfik Cad. 28, Bodrum",
    type: "sale", price: 420000, priceDisplay: "$420K", priceNote: null, currency: "USD",
    bedrooms: 3, bathrooms: 2, sqft: \1, netSqm: null, brutSqm: null, yearBuilt: null, yearRenovated: 2023,
    lat: 37.0344, lng: 27.4305,
    description: "A traditional Bodrum stone house — tangerine tree in the courtyard, whitewashed walls two feet thick, blue wooden shutters — brought back to life with a careful renovation.",
    features: ["Stone Construction", "Courtyard", "Full Renovation", "Near Castle", "Heated Floors", "Blue Shutters", "Tangerine Tree", "Walk to Marina"],
    status: "active", featured: true, allowInquiries: true, priceOnRequest: false, views: 98,
    agentName: "Attila Utkucan", agentTitle: "Founder & Agent",
    createdAt: "2024-07-01", updatedAt: "2024-07-01",
    images: [
      { id: "i34", propertyId: "12", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80", storagePath: "", isCover: true, altText: null, sortOrder: 0, width: 1200, height: 800, fileSize: null, createdAt: "" },
      { id: "i35", propertyId: "12", url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 1, width: 900, height: 600, fileSize: null, createdAt: "" },
      { id: "i36", propertyId: "12", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", storagePath: "", isCover: false, altText: null, sortOrder: 2, width: 900, height: 600, fileSize: null, createdAt: "" },
    ],
    nearbyPlaces: [
      { id: "n34", propertyId: "12", name: "Bodrum Castle", icon: "landmark", distance: "400m", sortOrder: 0 },
      { id: "n35", propertyId: "12", name: "Bodrum Marina", icon: "anchor", distance: "500m", sortOrder: 1 },
      { id: "n36", propertyId: "12", name: "Bazaar Street", icon: "shop", distance: "200m", sortOrder: 2 },
    ],
  },
];

export function getPropertyBySlug(slug: string): PropertyWithImages | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFilteredProperties(params: {
  city?: string;
  type?: string;
  neighborhood?: string;
  bedrooms?: string;
  sort?: string;
}): PropertyWithImages[] {
  let result = properties.filter((p) => p.status === "active");

  if (params.city) result = result.filter((p) => p.city === params.city);
  if (params.type) result = result.filter((p) => p.type === params.type);
  if (params.neighborhood) result = result.filter((p) => p.neighborhood === params.neighborhood);
  if (params.bedrooms) {
    const beds = parseInt(params.bedrooms);
    result = result.filter((p) => (beds >= 4 ? p.bedrooms >= 4 : p.bedrooms === beds));
  }

  switch (params.sort) {
    case "price-low": return result.sort((a, b) => a.price - b.price);
    case "price-high": return result.sort((a, b) => b.price - a.price);
    case "size": return result.sort((a, b) => b.sqft - a.sqft);
    case "beds": return result.sort((a, b) => b.bedrooms - a.bedrooms);
    default: return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}
