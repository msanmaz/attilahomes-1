# About Section & Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the ATTILA site from global luxury placeholders into a coherent personal brand for Attila Utkucan, an independent Istanbul/Bodrum realtor — adding an About section, localizing all property data, and implementing two-layer city/neighborhood filtering.

**Architecture:** Single `index.html` file. All changes are in-place edits to the existing HTML/CSS/JS. One photo asset is copied into `assets/`. The property data array is fully replaced, filter state gains a `city` key, and the filter UI adds a city toggle row plus a dynamic neighborhood dropdown.

**Tech Stack:** HTML, CSS, vanilla JavaScript (no frameworks, no build tools)

**Spec:** `docs/superpowers/specs/2026-05-04-about-section-and-localization-design.md`

---

### Task 1: Copy Photo Asset

**Files:**
- Create: `assets/attila-portrait.jpg` (copied from `/Users/mertosanmaz/Downloads/IMG_2070 copy.JPG`)

- [ ] **Step 1: Create assets directory and copy photo**

```bash
mkdir -p /Users/mertosanmaz/test-attila/assets
cp "/Users/mertosanmaz/Downloads/IMG_2070 copy.JPG" /Users/mertosanmaz/test-attila/assets/attila-portrait.jpg
```

- [ ] **Step 2: Verify file exists**

```bash
ls -la /Users/mertosanmaz/test-attila/assets/attila-portrait.jpg
```

Expected: File listed with non-zero size.

- [ ] **Step 3: Commit**

```bash
git add assets/attila-portrait.jpg
git commit -m "feat: add Attila portrait photo asset"
```

---

### Task 2: Add About Section CSS

**Files:**
- Modify: `index.html` (CSS section, insert before `/* ─── LISTINGS PAGE ─── */` comment around line 579)

- [ ] **Step 1: Add About section CSS rules**

Insert the following CSS block before the `/* ─── LISTINGS PAGE ─── */` comment:

```css
/* ─── ABOUT SECTION ─── */
.about-section {
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  gap: 4rem;
  align-items: center;
  padding: 6rem 3rem;
  background: var(--bg-secondary);
  border-top: 1px solid rgba(242,236,224,0.06);
}

.about-image {
  position: relative;
  overflow: hidden;
}

.about-image img {
  width: 100%;
  height: auto;
  display: block;
  filter: brightness(0.95);
  transition: transform 0.8s var(--transition);
}

.about-image:hover img {
  transform: scale(1.03);
}

.about-image::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(200,165,92,0.1);
  pointer-events: none;
}

.about-content {
  max-width: 600px;
}

.about-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.about-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.8;
  font-weight: 300;
  margin-bottom: 1rem;
}

.about-cta {
  margin-top: 1.5rem;
}
```

- [ ] **Step 2: Add responsive rules for About section**

Add inside the `@media (max-width: 1024px)` block:

```css
.about-section { grid-template-columns: 1fr; gap: 2rem; }
```

Add inside the `@media (max-width: 768px)` block:

```css
.about-section { padding: 4rem 1.5rem; }
```

- [ ] **Step 3: Verify in browser**

Open `index.html` in a browser. The About section CSS won't be visible yet (no HTML), but verify no CSS parse errors by checking that existing sections still render correctly.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add About section CSS styles"
```

---

### Task 3: Add About Section HTML

**Files:**
- Modify: `index.html` (HTML section, insert between the Featured Properties `</section>` closing tag around line 1386 and the Neighborhoods `<!-- NEIGHBORHOODS -->` comment around line 1388)

- [ ] **Step 1: Insert About section HTML**

Insert the following HTML between the Featured Properties section closing `</section>` and the `<!-- NEIGHBORHOODS -->` comment:

```html
  <!-- ABOUT -->
  <section class="about-section fade-in">
    <div class="about-image">
      <img src="assets/attila-portrait.jpg" alt="Attila Utkucan">
    </div>
    <div class="about-content">
      <div class="section-label">About</div>
      <h2 class="about-name">Attila Utkucan</h2>
      <p class="about-text">An independent realtor rooted in Istanbul with deep knowledge of the Bodrum and Istanbul markets. Attila has built his reputation on an instinct for potential — finding value where others see wear, and character where others see age. His clients trust him for honest guidance, local insight, and an eye that sees what a property can become.</p>
      <p class="about-text">Beyond brokerage, Attila is a hands-on developer specializing in the transformation of aging Istanbul apartments into modern living spaces. From sourcing neglected buildings in historic neighborhoods to overseeing every detail of renovation, he bridges the gap between vision and reality — delivering homes that honor their heritage while meeting contemporary standards.</p>
      <div class="about-cta">
        <a class="btn btn-outline">Learn More</a>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Scroll past featured properties. Verify:
- Photo loads on the left, text on the right
- "ABOUT" label appears in gold
- "ATTILA UTKUCAN" displays in Cormorant Garamond, large, letter-spaced
- Two bio paragraphs render with secondary text color
- "Learn More" button appears in outline style
- Section has dark secondary background
- Fade-in animation triggers on scroll
- On narrow viewport (<1024px), layout stacks vertically

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add About section for Attila Utkucan on homepage"
```

---

### Task 4: Replace Property Data with Istanbul & Bodrum Listings

**Files:**
- Modify: `index.html` (JavaScript section — replace the entire `const properties = [...]` array, lines ~1557-1820)

- [ ] **Step 1: Replace the properties array**

Replace the entire `const properties = [...]` array (from `const properties = [` to the closing `];`) with:

```javascript
const properties = [
  {
    id: 1,
    name: "Bosphorus View Penthouse",
    location: "Beşiktaş",
    city: "Istanbul",
    fullAddress: "Kuruçeşme Cad. 42, Beşiktaş, Istanbul",
    type: "sale",
    price: 1200000,
    priceDisplay: "$1.2M",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
    ],
    description: "Commanding uninterrupted views of the Bosphorus strait from Kuruçeşme's most coveted stretch, this penthouse occupies the top two floors of a contemporary waterfront residence. Floor-to-ceiling glass frames the passing ships, the Asian shore, and the illuminated minarets of Üsküdar at dusk. The open-plan living space flows onto a wraparound terrace — ideal for hosting against Istanbul's most dramatic backdrop. Interiors blend polished concrete with warm walnut paneling and Aegean marble throughout.",
    features: ["Bosphorus Views", "Wraparound Terrace", "Private Elevator", "Smart Home", "Underfloor Heating", "2 Parking Spots", "Concierge", "Gym Access"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" },
    featured: true
  },
  {
    id: 2,
    name: "Renovated Heritage Apartment",
    location: "Kadıköy",
    city: "Istanbul",
    fullAddress: "Caferağa Mah. Moda Cad. 18, Kadıköy, Istanbul",
    type: "sale",
    price: 8500000,
    priceDisplay: "₺8.5M",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80"
    ],
    description: "A ground-up renovation in the heart of Moda, this apartment transforms a 1920s Armenian-era building into a contemporary residence that respects its bones. Original ceiling rosettes and hardwood floors have been restored; new elements — a chef's kitchen with Smeg appliances, walk-in rainfall showers, and a climate-controlled wine niche — are woven in without erasing the building's story. Steps from Moda's waterfront promenade, cafés, and the Kadıköy ferry terminal.",
    features: ["Period Restoration", "Chef's Kitchen", "High Ceilings", "Hardwood Floors", "Wine Niche", "Near Ferry", "Balcony", "Storage"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" },
    featured: true
  },
  {
    id: 3,
    name: "Art Deco Residence",
    location: "Nişantaşı",
    city: "Istanbul",
    fullAddress: "Abdi İpekçi Cad. 7, Nişantaşı, Istanbul",
    type: "sale",
    price: 650000,
    priceDisplay: "$650K",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80"
    ],
    description: "In Istanbul's most refined shopping district, this art deco apartment occupies the third floor of a 1930s landmark building. Geometric ironwork, terrazzo floors, and arched doorways have been preserved through a meticulous renovation. The living room opens to a south-facing balcony overlooking Abdi İpekçi — the city's answer to Avenue Montaigne. Two bedrooms sit at the quieter rear, each with bespoke wardrobes and en-suite baths clad in Afyon marble.",
    features: ["Art Deco Details", "Terrazzo Floors", "South Balcony", "Marble Baths", "Central Location", "Elevator", "Cellar", "Doorman"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" },
    featured: true
  },
  {
    id: 4,
    name: "Bohemian Loft",
    location: "Cihangir",
    city: "Istanbul",
    fullAddress: "Akarsu Cad. 22, Cihangir, Istanbul",
    type: "rent",
    price: 45000,
    priceDisplay: "₺45,000",
    priceNote: "/month",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80"
    ],
    description: "Perched above Cihangir's café-lined slopes with a sliver of Golden Horn view, this fully furnished loft captures the neighborhood's creative energy. Exposed brick walls, steel-framed windows, and polished concrete floors create an industrial canvas softened by vintage Turkish kilims and curated mid-century furniture. The open kitchen features a brass-topped island perfect for casual entertaining. Cihangir Mosque and Firuzağa's morning markets are a two-minute walk.",
    features: ["Furnished", "Golden Horn View", "Exposed Brick", "Pet Friendly", "Café District", "Washer/Dryer", "Gas Heating", "Rooftop Access"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" },
    featured: true
  },
  {
    id: 5,
    name: "Galata Tower Apartment",
    location: "Galata",
    city: "Istanbul",
    fullAddress: "Galip Dede Cad. 9, Galata, Istanbul",
    type: "rent",
    price: 38000,
    priceDisplay: "₺38,000",
    priceNote: "/month",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
    ],
    description: "A compact jewel in the shadow of the Galata Tower, this character apartment sits in a restored Genoese-era building on one of Istanbul's most atmospheric streets. Stone walls, a vaulted ceiling in the bedroom, and original timber shutters give it the feel of a private retreat within the city's most vibrant quarter. The open-plan living area is bathed in light from oversized sash windows looking towards the Golden Horn.",
    features: ["Historic Building", "Vaulted Ceilings", "Tower Views", "Furnished", "Central Location", "Quiet Street", "Character Details", "Laundry"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 6,
    name: "Bebek Waterfront Residence",
    location: "Bebek",
    city: "Istanbul",
    fullAddress: "Bebek Mah. Cevdetpaşa Cad. 55, Bebek, Istanbul",
    type: "rent",
    price: 4500,
    priceDisplay: "$4,500",
    priceNote: "/month",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
    ],
    description: "On Bebek's storied waterfront — where Ottoman-era yalıs meet contemporary residences — this apartment offers the rare combination of Bosphorus proximity and village calm. Three bedrooms open to a continuous living space anchored by a bay window framing the strait. The building sits directly on the coastal road, steps from Bebek's legendary cafés, the Boğaziçi University campus, and the wooded paths of Rumeli Hisarı. A private parking bay and 24-hour security complete the package.",
    features: ["Bosphorus Proximity", "Bay Window", "3 Bedrooms", "Parking", "24/7 Security", "Near Cafés", "University Area", "Furnished Option"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 7,
    name: "Modern Üsküdar Flat",
    location: "Üsküdar",
    city: "Istanbul",
    fullAddress: "Kısıklı Cad. 12, Üsküdar, Istanbul",
    type: "rent",
    price: 32000,
    priceDisplay: "₺32,000",
    priceNote: "/month",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
    ],
    description: "A bright, newly finished flat on the Asian side offering a quieter rhythm of Istanbul life. Clean lines, engineered oak floors, and a minimalist kitchen with integrated appliances define the interior. The building is set back from the main road in a residential compound with landscaped gardens, a shared pool, and underground parking. Üsküdar's ferry terminal — and a 15-minute crossing to Beşiktaş — is a short bus ride away.",
    features: ["New Build", "Compound Living", "Shared Pool", "Underground Parking", "Gardens", "Near Metro", "Balcony", "Storage Unit"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 8,
    name: "Renovated Beşiktaş Duplex",
    location: "Beşiktaş",
    city: "Istanbul",
    fullAddress: "Sinanpaşa Mah. Ihlamur Cad. 31, Beşiktaş, Istanbul",
    type: "sale",
    price: 12000000,
    priceDisplay: "₺12M",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80"
    ],
    description: "A duplex renovation showcasing Attila's signature style — stripped back to the structure and rebuilt with intention. The lower floor is an open social space where a blackened-steel staircase connects to three upper bedrooms. Original stone walls have been exposed and sealed; new interventions — a cantilevered mezzanine reading nook, a poured-concrete kitchen island — are clearly contemporary, creating a dialogue between old and new. Walking distance to Beşiktaş market and the Dolmabahçe waterfront.",
    features: ["Full Renovation", "Duplex Layout", "Exposed Stone", "Steel Staircase", "Near Market", "Mezzanine", "Concrete Kitchen", "Gas Heating"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 9,
    name: "Aegean Hilltop Villa",
    location: "Yalıkavak",
    city: "Bodrum",
    fullAddress: "Tilkicik Koyu Mevkii, Yalıkavak, Bodrum",
    type: "sale",
    price: 2800000,
    priceDisplay: "$2.8M",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=900&q=80"
    ],
    description: "Crowning a private hillside above Yalıkavak marina, this villa commands 180-degree views of the Aegean — from the Greek islands on the horizon to the turquoise bays below. Whitewashed walls, natural stone terraces, and a 20-meter infinity pool dissolve the line between architecture and landscape. Five bedroom suites are distributed across three levels, each with its own terrace and sea view. The lower level houses a hammam, gym, and temperature-controlled wine room carved into the hillside rock.",
    features: ["Infinity Pool", "Sea Views", "Hammam & Gym", "Wine Room", "5 Terraces", "Private Garden", "Parking", "Near Marina"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 10,
    name: "Göltürkbükü Sea-View Villa",
    location: "Göltürkbükü",
    city: "Bodrum",
    fullAddress: "Göltürkbükü Mah. Deniz Sok. 5, Bodrum",
    type: "sale",
    price: 1900000,
    priceDisplay: "$1.9M",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80"
    ],
    description: "Set above the twin bays of Göltürkbükü — Bodrum's most sought-after summer address — this contemporary villa pairs clean Mediterranean lines with lush subtropical landscaping. The ground floor is a single open volume: living, dining, and kitchen flowing through retractable glass walls to a shaded outdoor lounge and pool deck. Upstairs, four bedroom suites open onto private balconies with unobstructed bay views. A stone path descends through the garden to the beach club below.",
    features: ["Bay Views", "Pool", "Beach Access", "Retractable Glass", "Garden", "Outdoor Lounge", "4 Balconies", "Near Beach Club"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 11,
    name: "Türkbükü Holiday Villa",
    location: "Türkbükü",
    city: "Bodrum",
    fullAddress: "Türkbükü Mah. Atatürk Cad. 14, Bodrum",
    type: "rent",
    price: 8000,
    priceDisplay: "$8,000",
    priceNote: "/month",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80"
    ],
    description: "A turnkey summer retreat in Türkbükü's quieter hillside, fully furnished for seasonal living. Bougainvillea-draped terraces wrap the whitewashed structure; a heated plunge pool and outdoor dining area sit beneath a mature olive canopy. Inside, natural linen upholstery, handmade ceramic tiles, and reclaimed timber beams create a relaxed coastal atmosphere. Available May through October — minimum three-month lease for the discerning seasonal tenant.",
    features: ["Seasonal Rental", "Heated Pool", "Furnished", "Olive Garden", "Outdoor Dining", "Sea Glimpses", "BBQ Area", "Parking"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  },
  {
    id: 12,
    name: "Renovated Stone House",
    location: "Bodrum Center",
    city: "Bodrum",
    fullAddress: "Eski Çeşme Mah. Neyzen Tevfik Cad. 28, Bodrum",
    type: "sale",
    price: 420000,
    priceDisplay: "$420K",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
    ],
    description: "A traditional Bodrum stone house — tangerine tree in the courtyard, whitewashed walls two feet thick, blue wooden shutters — brought back to life with a careful renovation. The original structure's footprint has been preserved: three interconnected rooms around a central courtyard, now reimagined as an open kitchen-living space, a private bedroom wing, and a guest suite. Modern comforts — air conditioning, a rainfall shower, heated floors — are invisible behind the vernacular charm. Five minutes on foot to Bodrum Castle and the marina.",
    features: ["Stone Construction", "Courtyard", "Full Renovation", "Near Castle", "Heated Floors", "Blue Shutters", "Tangerine Tree", "Walk to Marina"],
    agent: { name: "Attila Utkucan", title: "Founder & Agent", initials: "AU" }
  }
];
```

- [ ] **Step 2: Update the featured flags**

Ensure properties with ids 1, 2, 3, 4 have `featured: true`. The rest should not have the `featured` property (or have it set to false). This is already handled in the data above.

- [ ] **Step 3: Verify in browser**

Open `index.html`. Check:
- Homepage featured grid shows 4 Istanbul properties (Bosphorus penthouse, Kadıköy heritage, Nişantaşı art deco, Cihangir loft)
- Listings page shows all 12 properties
- Clicking a property card opens the detail page with correct Turkish address, description, and features
- All property images load
- Agent on every property is "Attila Utkucan"

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: replace global properties with Istanbul & Bodrum listings"
```

---

### Task 5: Update Filter System — Two-Layer City/Neighborhood

**Files:**
- Modify: `index.html` (HTML filter bar + JavaScript filter state and functions)

- [ ] **Step 1: Update the filter state**

Replace the `activeFilters` initialization:

```javascript
// old
let activeFilters = {
  type: 'all',
  bedrooms: [],
  locations: [],
  priceMin: null,
  priceMax: null
};

// new
let activeFilters = {
  city: 'all',
  type: 'all',
  bedrooms: [],
  neighborhoods: [],
  priceMin: null,
  priceMax: null
};
```

- [ ] **Step 2: Add neighborhood mapping constant**

Insert after the `activeFilters` declaration:

```javascript
const cityNeighborhoods = {
  Istanbul: ['Beşiktaş', 'Kadıköy', 'Nişantaşı', 'Cihangir', 'Galata', 'Bebek', 'Üsküdar'],
  Bodrum: ['Yalıkavak', 'Göltürkbükü', 'Türkbükü', 'Bodrum Center']
};
```

- [ ] **Step 3: Replace the filter bar HTML**

Replace the entire `<div class="filters-bar">...</div>` block in the listings page with:

```html
  <div class="filters-bar">
    <div class="filters-row">
      <div class="filter-type-btns">
        <button class="filter-type-btn active" data-city="all" onclick="setCityFilter('all')">All</button>
        <button class="filter-type-btn" data-city="Istanbul" onclick="setCityFilter('Istanbul')">Istanbul</button>
        <button class="filter-type-btn" data-city="Bodrum" onclick="setCityFilter('Bodrum')">Bodrum</button>
      </div>

      <div class="filter-type-btns">
        <button class="filter-type-btn active" data-type="all" onclick="setTypeFilter('all')">All</button>
        <button class="filter-type-btn" data-type="sale" onclick="setTypeFilter('sale')">For Sale</button>
        <button class="filter-type-btn" data-type="rent" onclick="setTypeFilter('rent')">For Rent</button>
      </div>

      <div class="filter-group">
        <button class="filter-btn" onclick="toggleDropdown('dd-neighborhoods')">
          Neighborhoods
          <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="filter-dropdown" id="dd-neighborhoods"></div>
      </div>

      <div class="filter-group">
        <button class="filter-btn" onclick="toggleDropdown('dd-bedrooms')">
          Bedrooms
          <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="filter-dropdown" id="dd-bedrooms">
          <div class="filter-option" data-value="1" onclick="toggleBedroomFilter(this)"><span class="check"></span> 1 Bedroom</div>
          <div class="filter-option" data-value="2" onclick="toggleBedroomFilter(this)"><span class="check"></span> 2 Bedrooms</div>
          <div class="filter-option" data-value="3" onclick="toggleBedroomFilter(this)"><span class="check"></span> 3 Bedrooms</div>
          <div class="filter-option" data-value="4" onclick="toggleBedroomFilter(this)"><span class="check"></span> 4+ Bedrooms</div>
        </div>
      </div>

      <div class="filter-group">
        <button class="filter-btn" onclick="toggleDropdown('dd-price')">
          Price Range
          <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="filter-dropdown" id="dd-price">
          <div class="price-range-wrapper">
            <div class="price-range-label">Set range</div>
            <div class="price-range-inputs">
              <input type="number" class="price-input" id="price-min" placeholder="Min" oninput="applyFilters()">
              <span>—</span>
              <input type="number" class="price-input" id="price-max" placeholder="Max" oninput="applyFilters()">
            </div>
          </div>
        </div>
      </div>

      <button class="filter-clear" onclick="clearFilters()">Clear All</button>
    </div>
  </div>
```

- [ ] **Step 4: Add city filter and neighborhood rendering functions**

Add these new functions and update existing ones in the JavaScript section:

```javascript
function setCityFilter(city) {
  activeFilters.city = city;
  activeFilters.neighborhoods = [];
  document.querySelectorAll('[data-city]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.city === city);
  });
  renderNeighborhoodDropdown();
  renderListings();
}

function renderNeighborhoodDropdown() {
  const container = document.getElementById('dd-neighborhoods');
  let neighborhoods;
  if (activeFilters.city === 'all') {
    neighborhoods = [...cityNeighborhoods.Istanbul, ...cityNeighborhoods.Bodrum];
  } else {
    neighborhoods = cityNeighborhoods[activeFilters.city];
  }
  container.innerHTML = neighborhoods.map(n => {
    const selected = activeFilters.neighborhoods.includes(n) ? ' selected' : '';
    return `<div class="filter-option${selected}" data-value="${n}" onclick="toggleNeighborhoodFilter(this)"><span class="check"></span> ${n}</div>`;
  }).join('');
}

function toggleNeighborhoodFilter(el) {
  el.classList.toggle('selected');
  const val = el.dataset.value;
  const idx = activeFilters.neighborhoods.indexOf(val);
  if (idx > -1) activeFilters.neighborhoods.splice(idx, 1);
  else activeFilters.neighborhoods.push(val);
  renderListings();
}
```

- [ ] **Step 5: Update `setTypeFilter` to use `data-type` selector**

Replace the `setTypeFilter` function:

```javascript
function setTypeFilter(type) {
  activeFilters.type = type;
  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  renderListings();
}
```

- [ ] **Step 6: Update `getFilteredProperties` for city and neighborhoods**

Replace the `getFilteredProperties` function:

```javascript
function getFilteredProperties() {
  return properties.filter(p => {
    if (activeFilters.city !== 'all' && p.city !== activeFilters.city) return false;
    if (activeFilters.type !== 'all' && p.type !== activeFilters.type) return false;
    if (activeFilters.bedrooms.length > 0) {
      const match = activeFilters.bedrooms.some(b => {
        if (b === 4) return p.bedrooms >= 4;
        return p.bedrooms === b;
      });
      if (!match) return false;
    }
    if (activeFilters.neighborhoods.length > 0 && !activeFilters.neighborhoods.includes(p.location)) return false;
    if (activeFilters.priceMin && p.price < activeFilters.priceMin) return false;
    if (activeFilters.priceMax && p.price > activeFilters.priceMax) return false;
    return true;
  });
}
```

- [ ] **Step 7: Update `clearFilters` for new state shape**

Replace the `clearFilters` function:

```javascript
function clearFilters() {
  activeFilters = { city: 'all', type: 'all', bedrooms: [], neighborhoods: [], priceMin: null, priceMax: null };
  document.querySelectorAll('[data-city]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.city === 'all');
  });
  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === 'all');
  });
  document.querySelectorAll('.filter-option.selected').forEach(opt => opt.classList.remove('selected'));
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';
  renderNeighborhoodDropdown();
  renderListings();
}
```

- [ ] **Step 8: Remove old `toggleLocationFilter` function**

Delete the `toggleLocationFilter` function entirely — it is replaced by `toggleNeighborhoodFilter`.

- [ ] **Step 9: Initialize neighborhood dropdown on page load**

In the `showPage` function, add `renderNeighborhoodDropdown()` inside the `if (page === 'listings')` block:

```javascript
if (page === 'listings') {
  if (typeFilter) {
    setTypeFilter(typeFilter);
  }
  renderNeighborhoodDropdown();
  renderListings();
}
```

- [ ] **Step 10: Verify in browser**

Open `index.html`, navigate to Listings. Verify:
- City toggle shows All | Istanbul | Bodrum
- Clicking Istanbul shows only Istanbul properties (8)
- Clicking Bodrum shows only Bodrum properties (4)
- Neighborhoods dropdown updates dynamically when city changes
- Selecting a neighborhood filters correctly
- Switching city clears neighborhood selections
- Type filter (All/Sale/Rent) still works alongside city filter
- Bedroom and price filters still work
- Clear All resets everything
- Results count is accurate

- [ ] **Step 11: Commit**

```bash
git add index.html
git commit -m "feat: add two-layer city/neighborhood filtering for Istanbul & Bodrum"
```

---

### Task 6: Update Hero, Stats, Neighborhoods, and Footer

**Files:**
- Modify: `index.html` (HTML content sections)

- [ ] **Step 1: Update hero section**

Replace the hero content (the hero-bg img, hero-label, hero-title, hero-subtitle):

Change the hero background image src to an Istanbul/Bosphorus image:
```html
<img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1800&q=80" alt="Istanbul Bosphorus">
```

Change the hero-label text:
```html
<div class="hero-label">Istanbul & Bodrum Real Estate</div>
```

Change the hero-title:
```html
<h1 class="hero-title">Find Your<br><em>Exceptional</em> Home</h1>
```

Change the hero-subtitle:
```html
<p class="hero-subtitle">Handpicked properties across Istanbul's most sought-after neighborhoods and the Bodrum coastline. Curated by Attila Utkucan.</p>
```

- [ ] **Step 2: Update stats ribbon**

Replace the four stat items with:

```html
  <div class="stats-ribbon fade-in">
    <div class="stat-item">
      <div class="stat-number">120+</div>
      <div class="stat-label">Properties Listed</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">35</div>
      <div class="stat-label">Renovations Completed</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">8</div>
      <div class="stat-label">Years Experience</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">97%</div>
      <div class="stat-label">Client Satisfaction</div>
    </div>
  </div>
```

- [ ] **Step 3: Update neighborhoods section**

Replace the three neighborhood cards with Istanbul and Bodrum content:

```html
  <section class="section" style="background: var(--bg-secondary);">
    <div class="section-header fade-in">
      <div>
        <div class="section-label">Explore</div>
        <h2 class="section-title">Neighborhoods</h2>
      </div>
    </div>
    <div class="neighborhoods-grid fade-in">
      <div class="neighborhood-card" onclick="showPage('listings', null, 'Istanbul')">
        <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" alt="Beşiktaş & Bosphorus">
        <div class="neighborhood-card-content">
          <div class="neighborhood-card-name">Beşiktaş & Bosphorus</div>
          <div class="neighborhood-card-count">Istanbul's European Waterfront</div>
        </div>
      </div>
      <div class="neighborhood-card" onclick="showPage('listings', null, 'Istanbul')">
        <img src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80" alt="Kadıköy & Asian Side">
        <div class="neighborhood-card-content">
          <div class="neighborhood-card-name">Kadıköy & Asian Side</div>
          <div class="neighborhood-card-count">Istanbul's Cultural Hub</div>
        </div>
      </div>
      <div class="neighborhood-card" onclick="showPage('listings', null, 'Bodrum')">
        <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80" alt="Bodrum Peninsula">
        <div class="neighborhood-card-content">
          <div class="neighborhood-card-name">Bodrum Peninsula</div>
          <div class="neighborhood-card-count">Aegean Coastal Luxury</div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Update showPage to accept city parameter**

Update the `showPage` function signature and body:

```javascript
function showPage(page, typeFilter, cityFilter) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  const target = document.getElementById(`page-${page}`);
  target.style.display = 'block';
  requestAnimationFrame(() => target.classList.add('active'));

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === 'listings') {
    if (cityFilter) {
      setCityFilter(cityFilter);
    }
    if (typeFilter) {
      setTypeFilter(typeFilter);
    }
    renderNeighborhoodDropdown();
    renderListings();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

- [ ] **Step 5: Update footer content**

Replace the footer-grid inner HTML in the home page footer:

```html
    <div class="footer-grid">
      <div>
        <div class="footer-brand">ATTIL<span>A</span></div>
        <p class="footer-text">Curated real estate across Istanbul and the Bodrum peninsula. Every property is personally vetted by Attila Utkucan — from Bosphorus penthouses to restored stone houses.</p>
      </div>
      <div class="footer-col">
        <h4>Properties</h4>
        <a href="#" onclick="showPage('listings', 'sale')">For Sale</a>
        <a href="#" onclick="showPage('listings', 'rent')">For Rent</a>
        <a href="#" onclick="showPage('listings', null, 'Istanbul')">Istanbul</a>
        <a href="#" onclick="showPage('listings', null, 'Bodrum')">Bodrum</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About Attila</a>
        <a href="#">Renovation Projects</a>
        <a href="#">Press</a>
        <a href="#">Partnerships</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="#">Istanbul Office</a>
        <a href="#">Bodrum Office</a>
        <a href="#">WhatsApp</a>
        <a href="#">Instagram</a>
      </div>
    </div>
```

Also update the listings page footer copyright:
```html
<p>&copy; 2026 Attila Utkucan Real Estate. All rights reserved.</p>
```

And the home page footer copyright:
```html
<p>&copy; 2026 Attila Utkucan Real Estate. All rights reserved.</p>
```

- [ ] **Step 6: Verify in browser**

Open `index.html`. Check:
- Hero shows Istanbul/Bosphorus imagery with updated copy
- Stats show realistic numbers (120+ properties, 35 renovations, 8 years, 97%)
- Neighborhoods show 3 Turkish cards with correct images
- Clicking a neighborhood card navigates to listings with correct city filter applied
- Footer reflects Attila's brand with Istanbul/Bodrum links
- All navigation flows work end-to-end

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: localize hero, stats, neighborhoods, and footer to Istanbul & Bodrum"
```

---

### Task 7: Final Integration Verification

**Files:**
- No file changes — verification only

- [ ] **Step 1: Full homepage walkthrough**

Open `index.html` and scroll through the entire homepage:
1. Hero: Istanbul imagery, correct copy, both CTA buttons work
2. Stats: 120+ | 35 | 8 | 97%
3. Featured: 4 Istanbul properties in asymmetric grid
4. About: Attila's photo left, bio right, "Learn More" button
5. Neighborhoods: 3 cards (Beşiktaş, Kadıköy, Bodrum)
6. Footer: Updated branding and links

- [ ] **Step 2: Full listings page walkthrough**

Navigate to Listings page:
1. All 12 properties visible
2. City filter: All shows 12, Istanbul shows 8, Bodrum shows 4
3. Type filter works with city filter (e.g., Istanbul + Rent = 4 results)
4. Neighborhood dropdown updates per city selection
5. Bedroom filter works
6. Price filter works
7. Clear All resets everything
8. Results count is accurate

- [ ] **Step 3: Detail page verification**

Click on 3 different properties (1 Istanbul sale, 1 Istanbul rent, 1 Bodrum sale):
1. Gallery images load
2. Turkish address displays correctly (including ş, ı, ö, ü characters)
3. Description and features render
4. Price and agent info correct
5. Back button returns to listings

- [ ] **Step 4: Responsive checks**

Resize browser to mobile width:
1. About section stacks vertically
2. Filters wrap properly
3. Property cards go single-column
4. Neighborhoods stack

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add index.html
git commit -m "fix: address integration issues from final verification"
```
