import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/components/dashboard/property-form";
import type { PropertyWithImages, PropertyImage, NearbyPlace } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function transform(row: any): PropertyWithImages {
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
    images: (row.images ?? []).map((i: any): PropertyImage => ({
      id: i.id, propertyId: i.property_id, url: i.url, storagePath: i.storage_path,
      isCover: i.is_cover, altText: i.alt_text, sortOrder: i.sort_order,
      width: i.width, height: i.height, fileSize: i.file_size, createdAt: i.created_at,
    })),
    nearbyPlaces: (row.nearbyPlaces ?? []).map((n: any): NearbyPlace => ({
      id: n.id, propertyId: n.property_id, name: n.name, icon: n.icon,
      distance: n.distance, sortOrder: n.sort_order,
    })),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*, images:property_images(*), nearbyPlaces:nearby_places(*)")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  return <PropertyForm property={transform(data)} />;
}
