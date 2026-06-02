import type { Metadata } from "next";
import { PropertyForm } from "@/components/dashboard/property-form";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NewPropertyPage() {
  return <PropertyForm />;
}
