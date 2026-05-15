import { getActiveProperties } from "@/lib/queries/properties";
import { PropertiesTable } from "@/components/dashboard/properties-table";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getActiveProperties();
  return <PropertiesTable properties={properties} />;
}
