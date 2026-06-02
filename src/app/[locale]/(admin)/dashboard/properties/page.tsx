import type { Metadata } from "next";
import { getActiveProperties } from "@/lib/queries/properties";
import { PropertiesTable } from "@/components/dashboard/properties-table";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getActiveProperties();
  return <PropertiesTable properties={properties} />;
}
