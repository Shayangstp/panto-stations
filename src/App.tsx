import { useMemo, useState } from "react";

import type { Station } from "./features/stations/types";
import { AppShell } from "./shared/layout/AppShell";
import { CityFilter } from "./features/stations/components/CityFilter";
import { StationsList } from "./features/stations/components/StationsList";
import { StationsMap } from "./features/stations/components/StationsMap";
import { useStations } from "./features/stations/hooks/useStations";
import { getUniqueCities } from "./features/stations/utils/getUniqueCities";
import { filterStations } from "./features/stations/utils/filterStations";

export default function App() {
  const { data, status, error, refetch } = useStations();

  const [cityQuery, setCityQuery] = useState("");
  const [citySelected, setCitySelected] = useState<string>("");

  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  const cities = useMemo(() => getUniqueCities(data ?? []), [data]);

  const filteredStations = useMemo(() => {
    const query = citySelected || cityQuery;
    return filterStations(data ?? [], query);
  }, [data, cityQuery, citySelected]);

  const selectedStation: Station | null = useMemo(() => {
    if (!data || selectedStationId == null) return null;
    return data.find((s) => s.id === selectedStationId) ?? null;
  }, [data, selectedStationId]);

  const clearFilter = () => {
    setCityQuery("");
    setCitySelected("");
  };

  return (
    <AppShell
      left={
        <div className="flex h-full flex-col gap-3">
          <header className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Germany Train Stations</h1>
            <p className="text-sm text-neutral-600">
              Filter by city and click a station to zoom on the map.
            </p>
          </header>

          <CityFilter
            cities={cities}
            queryValue={cityQuery}
            selectedValue={citySelected}
            onQueryChange={(v) => {
              setCityQuery(v);
              setCitySelected("");
            }}
            onSelectChange={(v) => {
              setCitySelected(v);
              setCityQuery("");
            }}
            onClear={clearFilter}
          />

          {status === "loading" && (
            <div className="rounded-xl border bg-white p-4 text-sm">Loading stations…</div>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
              <div className="font-medium text-red-800">Fetch failed</div>
              <div className="mt-1 text-red-700">{error?.message ?? "Unknown error"}</div>
              <button
                onClick={refetch}
                className="mt-3 inline-flex rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {status === "success" && (
            <StationsList
              stations={filteredStations}
              selectedId={selectedStationId}
              onSelect={(id) => setSelectedStationId(id)}
            />
          )}
        </div>
      }
      right={
        <div className="h-full min-h-130 overflow-hidden rounded-2xl border bg-white">
          <StationsMap
            stations={filteredStations}
            selectedStation={selectedStation}
            onSelectStation={(id) => setSelectedStationId(id)}
          />
        </div>
      }
    />
  );
}
