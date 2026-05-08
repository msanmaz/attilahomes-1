import Image from "next/image";
import Link from "next/link";

const NEIGHBORHOODS = [
  {
    name: "Beşiktaş & Bosphorus",
    subtitle: "İstanbul'un Avrupa Yakası Sahili",
    city: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
  },
  {
    name: "Kadıköy & Asian Side",
    subtitle: "İstanbul'un Kültür Merkezi",
    city: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
  },
  {
    name: "Bodrum Peninsula",
    subtitle: "Ege Kıyısı Lüksü",
    city: "Bodrum",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
];

export function NeighborhoodsGrid() {
  return (
    <section className="py-24 px-8 bg-bg-secondary">
      <div className="mb-14">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          Keşfet
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light">
          Semtler
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEIGHBORHOODS.map((hood) => (
          <Link
            key={hood.name}
            href={`/properties?city=${hood.city}`}
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={hood.image}
              alt={hood.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover brightness-50 saturate-[0.7] transition-all duration-800 group-hover:scale-[1.08] group-hover:brightness-[0.6] group-hover:saturate-[0.9]"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-bg-primary/70 to-transparent">
              <div className="font-display text-[1.8rem] font-normal mb-1">
                {hood.name}
              </div>
              <div className="text-[0.7rem] tracking-[0.15em] uppercase text-accent">
                {hood.subtitle}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
