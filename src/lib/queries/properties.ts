import { createClient } from "@/lib/supabase/server";
import type { PropertyWithImages, NearbyPlace, PropertyImage } from "@/lib/types";

type FilterParams = {
  city?: string;
  type?: string;
  neighborhood?: string;
  bedrooms?: string;
  sort?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function transformProperty(row: any): PropertyWithImages {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    city: row.city,
    neighborhood: row.neighborhood,
    fullAddress: row.full_address,
    type: row.type,
    price: Number(row.price),
    priceDisplay: row.price_display,
    priceNote: row.price_note,
    currency: row.currency,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    sqft: row.sqft,
    netSqm: row.net_sqm ?? null,
    brutSqm: row.brut_sqm ?? null,
    yearBuilt: row.year_built,
    yearRenovated: row.year_renovated,
    lat: row.lat,
    lng: row.lng,
    description: row.description,
    features: row.features ?? [],
    status: row.status,
    featured: row.featured,
    allowInquiries: row.allow_inquiries,
    priceOnRequest: row.price_on_request,
    views: row.views ?? 0,
    agentName: row.agent_name,
    agentTitle: row.agent_title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    images: (row.images ?? []).map(transformImage),
    nearbyPlaces: (row.nearbyPlaces ?? []).map(transformNearby),
  };
}

function transformImage(row: any): PropertyImage {
  return {
    id: row.id,
    propertyId: row.property_id,
    url: row.url,
    storagePath: row.storage_path,
    isCover: row.is_cover,
    altText: row.alt_text,
    sortOrder: row.sort_order,
    width: row.width,
    height: row.height,
    fileSize: row.file_size,
    createdAt: row.created_at,
  };
}

function transformNearby(row: any): NearbyPlace {
  return {
    id: row.id,
    propertyId: row.property_id,
    name: row.name,
    icon: row.icon,
    distance: row.distance,
    sortOrder: row.sort_order,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getActiveProperties(
  filters?: FilterParams,
): Promise<PropertyWithImages[]> {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select("*, images:property_images(*), nearbyPlaces:nearby_places(*)");

  // Only filter by status for public (non-authenticated) queries
  query = query.eq("status", "active");

  if (filters?.city) query = query.eq("city", filters.city);
  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.neighborhood)
    query = query.eq("neighborhood", filters.neighborhood);
  if (filters?.bedrooms) {
    const beds = parseInt(filters.bedrooms);
    if (beds >= 4) {
      query = query.gte("bedrooms", 4);
    } else {
      query = query.eq("bedrooms", beds);
    }
  }

  switch (filters?.sort) {
    case "price-low":
      query = query.order("price", { ascending: true });
      break;
    case "price-high":
      query = query.order("price", { ascending: false });
      break;
    case "size":
      query = query.order("sqft", { ascending: false });
      break;
    case "beds":
      query = query.order("bedrooms", { ascending: false });
      break;
    default:
      query = query
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(transformProperty);
}

export async function getPropertyBySlug(
  slug: string,
): Promise<PropertyWithImages | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, images:property_images(*), nearbyPlaces:nearby_places(*)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) return null;
  return transformProperty(data);
}

export async function getFeaturedProperties(
  limit = 8,
): Promise<PropertyWithImages[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, images:property_images(*), nearbyPlaces:nearby_places(*)")
    .eq("status", "active")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map(transformProperty);
}

export async function getAllPropertySlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("slug")
    .eq("status", "active");

  if (error) throw error;
  return (data ?? []).map((p) => ({ slug: p.slug }));
}
