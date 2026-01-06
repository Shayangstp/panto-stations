import type { Station } from "../types";

export function StationsList({
  stations,
  selectedId,
  onSelect,
}: {
  stations: Station[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border bg-white">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h2 className="text-sm font-semibold">Stations</h2>
        <span className="text-xs text-neutral-600">{stations.length}</span>
      </div>

      <div className="min-h-0 overflow-auto">
        {stations.length === 0 ? (
          <div className="p-4 text-sm text-neutral-600">No stations found.</div>
        ) : (
          <ul className="divide-y">
            {stations.map((s) => {
              const isSelected = s.id === selectedId;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => onSelect(s.id)}
                    className={[
                      "w-full px-3 py-3 text-left transition",
                      "hover:bg-neutral-50",
                      isSelected ? "bg-neutral-100" : "",
                    ].join(" ")}
                  >
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="mt-0.5 text-xs text-neutral-600">{s.city}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
