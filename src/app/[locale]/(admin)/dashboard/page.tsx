import Image from "next/image";
import Link from "next/link";
import { getActiveProperties } from "@/lib/queries/properties";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const ACTIVITY = [
  { text: "**Bosphorus View Penthouse** was published and is now live.", dot: "accent", time: "2 hours ago" },
  { text: "New inquiry received for **Art Deco Residence** from a potential buyer.", dot: "blue", time: "5 hours ago" },
  { text: "**3 new images** uploaded to the Aegean Hilltop Villa gallery.", dot: "sage", time: "Yesterday" },
  { text: "**Renovated Stone House** price updated from $400K to $420K.", dot: "rose", time: "2 days ago" },
  { text: "**Türkbükü Holiday Villa** marked as seasonal rental — available May–Oct.", dot: "accent", time: "3 days ago" },
];

const iconBg: Record<string, string> = {
  accent: "bg-accent-muted", sage: "bg-sage-muted", blue: "bg-blue-muted", rose: "bg-rose-muted",
};
const iconStroke: Record<string, string> = {
  accent: "stroke-accent", sage: "stroke-sage", blue: "stroke-blue", rose: "stroke-rose",
};
const dotBg: Record<string, string> = {
  accent: "bg-accent", sage: "bg-sage", blue: "bg-blue", rose: "bg-rose",
};

export default async function DashboardPage() {
  const properties = await getActiveProperties();

  const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
  const STATS = [
    { label: "Total Properties", value: String(properties.length), change: `${properties.length} active`, color: "accent" as const },
    { label: "Active Listings", value: String(properties.filter(p => p.type === "sale").length), change: "For sale", color: "sage" as const },
    { label: "Total Views", value: totalViews.toLocaleString(), change: "All time", color: "blue" as const },
    { label: "Rentals", value: String(properties.filter(p => p.type === "rent").length), change: "For rent", color: "rose" as const },
  ];

  const recent = properties.slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-card border border-border p-6 transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5"
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 flex items-center justify-center ${iconBg[stat.color]}`}>
                <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-none stroke-[1.5] ${iconStroke[stat.color]}`}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-[0.65rem] font-medium px-1.5 py-0.5 bg-sage-muted text-sage">
                {stat.change}
              </span>
            </div>
            <div className="font-display text-[2.2rem] font-normal leading-none mb-1">{stat.value}</div>
            <div className="text-[0.68rem] tracking-[0.15em] uppercase text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-bg-card border border-border">
          <div className="flex justify-between items-center px-6 py-4 border-b border-border">
            <h2 className="font-display text-xl font-normal">Recent Properties</h2>
            <Link href="/dashboard/properties" className="text-[0.68rem] tracking-[0.1em] uppercase text-accent hover:text-accent-hover transition-colors">
              View All
            </Link>
          </div>
          <div className="px-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Property", "Status", "Price", "Views"].map((h) => (
                    <th key={h} className="text-left py-3 text-[0.6rem] tracking-[0.2em] uppercase text-text-muted font-medium border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => {
                  const cover = p.images.find((i) => i.isCover) || p.images[0];
                  return (
                    <tr key={p.id} className="border-b border-border last:border-b-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          {cover && <Image src={cover.url} alt={p.name} width={48} height={36} className="object-cover border border-border shrink-0" />}
                          <div>
                            <div className="text-[0.82rem] font-medium leading-tight">{p.name}</div>
                            <div className="text-[0.65rem] text-text-muted">{p.neighborhood}, {p.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3"><Badge variant={p.status as "active" | "draft" | "sold" | "rented"}>{p.status}</Badge></td>
                      <td className="py-3 font-display text-[1rem] text-accent font-medium">{p.priceDisplay}</td>
                      <td className="py-3 text-[0.82rem] text-text-secondary">{p.views.toLocaleString()}</td>
                    </tr>
                  );
                })}
                {recent.length === 0 && (
                  <tr><td colSpan={4} className="py-8 text-center text-text-muted text-sm">No properties yet. Add one from the dashboard.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-xl font-normal">Activity</h2>
          </div>
          <div className="px-6 py-2">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-border last:border-b-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotBg[item.dot]}`} />
                <div>
                  <div className="text-[0.8rem] text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>') }}
                  />
                  <div className="text-[0.65rem] text-text-muted mt-0.5">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
