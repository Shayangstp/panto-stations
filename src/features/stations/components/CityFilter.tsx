export function CityFilter({
  cities,
  queryValue,
  selectedValue,
  onQueryChange,
  onSelectChange,
  onClear,
}: {
  cities: string[];
  queryValue: string;
  selectedValue: string;
  onQueryChange: (v: string) => void;
  onSelectChange: (v: string) => void;
  onClear: () => void;
}) {
  const hasFilter = Boolean(queryValue.trim() || selectedValue);

  return (
    <section className="rounded-2xl border bg-white p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Filter</h2>
        <button
          onClick={onClear}
          disabled={!hasFilter}
          className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <label className="text-xs font-medium text-neutral-600">City (search)</label>
        <input
          value={queryValue}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="e.g. Berlin"
          className="h-10 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        />

        <div className="mt-2 flex items-center gap-2">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-[11px] text-neutral-500">or</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <label className="text-xs font-medium text-neutral-600">City (dropdown)</label>
        <select
          value={selectedValue}
          onChange={(e) => onSelectChange(e.target.value)}
          className="h-10 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
