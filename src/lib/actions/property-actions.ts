"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PropertyInsert, PropertyUpdate } from "@/lib/types";
import { slugify } from "@/lib/utils";

export async function createProperty(data: PropertyInsert) {
  const supabase = await createClient();

  const baseSlug = slugify(data.name);
  const slug = baseSlug + "-" + crypto.randomUUID().slice(0, 8);

  const { data: property, error } = await supabase
    .from("properties")
    .insert({
      name: data.name,
      slug,
      city: data.city,
      neighborhood: data.neighborhood,
      full_address: data.fullAddress,
      type: data.type,
      price: data.price,
      price_display: data.priceDisplay,
      price_note: data.priceNote,
      currency: data.currency,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      sqft: data.sqft,
      net_sqm: data.netSqm ?? null,
      brut_sqm: data.brutSqm ?? null,
      lat: data.lat,
      lng: data.lng,
      description: data.description,
      features: data.features,
      status: data.status,
      featured: data.featured,
      allow_inquiries: data.allowInquiries,
      price_on_request: data.priceOnRequest,
      agent_name: data.agentName,
      agent_title: data.agentTitle,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/properties");
  revalidatePath("/");
  return { id: property.id as string };
}

export async function updateProperty(id: string, data: PropertyUpdate) {
  const supabase = await createClient();

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = slugify(data.name) + "-" + crypto.randomUUID().slice(0, 8);
  }
  if (data.city !== undefined) updateData.city = data.city;
  if (data.neighborhood !== undefined) updateData.neighborhood = data.neighborhood;
  if (data.fullAddress !== undefined) updateData.full_address = data.fullAddress;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.priceDisplay !== undefined) updateData.price_display = data.priceDisplay;
  if (data.priceNote !== undefined) updateData.price_note = data.priceNote;
  if (data.currency !== undefined) updateData.currency = data.currency;
  if (data.bedrooms !== undefined) updateData.bedrooms = data.bedrooms;
  if (data.bathrooms !== undefined) updateData.bathrooms = data.bathrooms;
  if (data.sqft !== undefined) updateData.sqft = data.sqft;
  if (data.netSqm !== undefined) updateData.net_sqm = data.netSqm;
  if (data.brutSqm !== undefined) updateData.brut_sqm = data.brutSqm;
  if (data.lat !== undefined) updateData.lat = data.lat;
  if (data.lng !== undefined) updateData.lng = data.lng;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.features !== undefined) updateData.features = data.features;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.featured !== undefined) updateData.featured = data.featured;
  if (data.allowInquiries !== undefined) updateData.allow_inquiries = data.allowInquiries;
  if (data.priceOnRequest !== undefined) updateData.price_on_request = data.priceOnRequest;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated. Please sign in first.");

  const { error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/properties");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Not authenticated. Please sign in at /login first.");
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(`Delete failed: ${error.message} (code: ${error.code})`);

  revalidatePath("/properties");
  revalidatePath("/dashboard/properties");
  revalidatePath("/");
  return { success: true };
}
