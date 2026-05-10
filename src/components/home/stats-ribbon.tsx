const STATS = [
  { value: "8", label: "Yıllık Deneyim" },
  { value: "97%", label: "Müşteri Memnuniyeti" },
];

export function StatsRibbon() {
  return (
    <div className="grid grid-cols-2 border-t border-b border-border">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="py-12 text-center border-r border-border last:border-r-0"
        >
          <div className="font-display text-5xl font-light text-accent leading-none mb-2">
            {stat.value}
          </div>
          <div className="text-[0.68rem] tracking-[0.2em] uppercase text-text-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
