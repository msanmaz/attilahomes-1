"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function uploadPropertyImage(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const propertyId = formData.get("propertyId") as string;
  const file = formData.get("file") as File;
  const isCover = formData.get("isCover") === "true";

  if (!propertyId || !file) throw new Error("Missing propertyId or file.");

  const ext = file.name.split(".").pop();
  const path = `${propertyId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("property-images")
    .upload(path, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("property-images").getPublicUrl(path);

  const { error: dbError } = await supabase.from("property_images").insert({
    property_id: propertyId,
    url: publicUrl,
    storage_path: path,
    is_cover: isCover,
    file_size: file.size,
  });

  if (dbError) throw dbError;

  revalidatePath(`/properties`);
  return { url: publicUrl, path };
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
