"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import type { InquiryInsert } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  await resend.emails.send({
    from: "Attila Homes <noreply@attilahomes.com>",
    to: "info@attilahomes.com",
    replyTo: data.email,
    subject: `Yeni İletişim Talebi — ${data.name}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1917;background:#f8f5f0;padding:40px;">
        <div style="border-bottom:2px solid #c8a55c;padding-bottom:16px;margin-bottom:24px;">
          <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c8a55c;margin:0 0 6px;">Attila Homes</p>
          <h1 style="font-size:24px;font-weight:400;margin:0;color:#0f0f0f;">Yeni İletişim Talebi</h1>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6560;width:140px;">Ad Soyad</td>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:15px;color:#0f0f0f;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6560;">E-posta</td>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:15px;"><a href="mailto:${data.email}" style="color:#c8a55c;">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6560;">Telefon</td>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:15px;"><a href="tel:${data.phone}" style="color:#c8a55c;">${data.phone}</a></td>
          </tr>
          ` : ""}
          ${data.propertyId ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6560;">Mülk ID</td>
            <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-size:15px;color:#0f0f0f;">${data.propertyId}</td>
          </tr>
          ` : ""}
          ${data.message ? `
          <tr>
            <td style="padding:10px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6560;vertical-align:top;">Mesaj</td>
            <td style="padding:10px 0;font-size:15px;color:#0f0f0f;line-height:1.7;">${data.message.replace(/\n/g, "<br>")}</td>
          </tr>
          ` : ""}
        </table>

        <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e8e0d0;font-size:11px;color:#a09a8c;text-align:center;">
          Bu e-posta attilahomes.com üzerindeki iletişim formundan otomatik olarak gönderilmiştir.
        </div>
      </div>
    `,
  });

  return { success: true };
}
