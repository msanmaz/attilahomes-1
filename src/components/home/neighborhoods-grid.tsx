import Image from "next/image";
import Link from "next/link";

const CITIES = [
  {
    name: "İstanbul",
    subtitle: "Boğaz'ın İki Yakasında Eşsiz Yaşam",
    city: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
  },
  {
    name: "Bodrum",
    subtitle: "Ege Kıyısında Lüks Yaşam",
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
          Şehirler
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CITIES.map((c) => (
          <Link
            key={c.name}
            href={`/properties?city=${c.city}`}
            className="group relative aspect-[3/4] md:aspect-[4/3] overflow-hidden"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover brightness-50 saturate-[0.7] transition-all duration-800 group-hover:scale-[1.08] group-hover:brightness-[0.6] group-hover:saturate-[0.9]"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-bg-primary/70 to-transparent">
              <div className="font-display text-[2.2rem] font-normal mb-1">
                {c.name}
              </div>
              <div className="text-[0.7rem] tracking-[0.15em] uppercase text-accent">
                {c.subtitle}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
