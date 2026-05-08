import { Button } from "@/components/ui/button";
import type { PropertyWithImages } from "@/lib/types";

type Props = {
  property: PropertyWithImages;
};

export function PropertySidebar({ property: p }: Props) {
  const priceNote =
    p.type === "rent" ? "Aylık, mobilyalı" : "İstenen fiyat, pazarlık hariç";

  return (
    <div className="sticky top-24 self-start">
      <div className="bg-bg-card border border-border p-8">
        <div className="font-display text-[2.2rem] text-accent font-medium mb-1">
          {p.priceDisplay}
        </div>
        <div className="text-[0.72rem] text-text-muted mb-6">{priceNote}</div>

        <Button variant="primary" className="w-full mb-2.5 justify-center">
          {p.type === "sale" ? "Görüntüleme Randevusu" : "Hemen Başvur"}
        </Button>
        <Button variant="outline" className="w-full justify-center">
          Bilgi İste
        </Button>

        <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
          <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center font-display text-[1.1rem] text-accent shrink-0">
            {p.agentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-[0.9rem] font-medium">{p.agentName}</div>
            <div className="text-[0.7rem] text-text-muted">{p.agentTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
