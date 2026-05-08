"use server";

import { createClient } from "@/lib/supabase/server";
import type { InquiryInsert } from "@/lib/types";

export async function submitInquiry(data: InquiryInsert) {
  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").insert({
    property_id: data.propertyId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });

  if (error) throw error;
  return { success: true };
}
