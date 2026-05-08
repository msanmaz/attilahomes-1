export type PropertyStatus = "draft" | "active" | "sold" | "rented";
export type PropertyType = "sale" | "rent";
export type Currency = "USD" | "TRY" | "EUR";
export type City = "Istanbul" | "Bodrum";
export type NearbyIcon =
  | "tree"
  | "anchor"
  | "shop"
  | "train"
  | "walk"
  | "glass"
  | "landmark";
export type InquiryStatus = "new" | "read" | "replied" | "archived";

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

export type PropertyWithImages = Property & {
  images: PropertyImage[];
  nearbyPlaces: NearbyPlace[];
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

export type PropertyInsert = Omit<
  Property,
  "id" | "slug" | "views" | "createdAt" | "updatedAt"
>;
export type PropertyUpdate = Partial<PropertyInsert>;
export type InquiryInsert = Omit<
  Inquiry,
  "id" | "propertyName" | "status" | "createdAt"
>;
