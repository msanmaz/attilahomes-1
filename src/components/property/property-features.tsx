type Props = {
  features: string[];
  heading: string;
};

export function PropertyFeatures({ features, heading }: Props) {
  return (
    <div className="mb-10">
      <h3 className="font-display text-2xl font-normal mb-4">
        {heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2.5 p-3 bg-bg-secondary text-[0.82rem] text-text-secondary"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-accent fill-none stroke-[1.5] shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
