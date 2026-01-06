import type { Station } from "../types";

export function filterStations(stations: Station[], cityQuery: string): Station[] {
  const q = cityQuery.trim().toLowerCase();
  if (!q) return stations;

  return stations.filter((s) => s.city.toLowerCase().includes(q));
}
