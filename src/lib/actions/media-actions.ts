"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function savePropertyImageRecord(data: {
  propertyId: string;
  url: string;
  storagePath: string;
  isCover: boolean;
  fileSize: number;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { error: dbError } = await supabase.from("property_images").insert({
    property_id: data.propertyId,
    url: data.url,
    storage_path: data.storagePath,
    is_cover: data.isCover,
    file_size: data.fileSize,
  });

  if (dbError) throw dbError;

  revalidatePath(`/properties`);
  return { url: data.url, path: data.storagePath };
}

export async function insertPropertyImages(
  records: Array<{
    propertyId: string;
    url: string;
    storagePath: string;
    isCover: boolean;
    fileSize: number;
  }>,
) {
  if (records.length === 0) return;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { error } = await supabase.from("property_images").insert(
    records.map((r) => ({
      property_id: r.propertyId,
      url: r.url,
      storage_path: r.storagePath,
      is_cover: r.isCover,
      file_size: r.fileSize,
    })),
  );

  if (error) throw error;
  revalidatePath("/properties");
}

export async function deletePropertyImage(imageId: string, storagePath: string) {
  const supabase = await createClient();

  if (storagePath) {
    await supabase.storage.from("property-images").remove([storagePath]);
  }

  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);

  if (error) throw error;

  revalidatePath("/properties");
  return { success: true };
}

export async function setCoverImage(imageId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("property_images")
    .update({ is_cover: true })
    .eq("id", imageId);

  if (error) throw error;

  revalidatePath("/properties");
  return { success: true };
}
