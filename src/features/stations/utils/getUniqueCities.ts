import type { Station } from "../types";

export function getUniqueCities(stations: Station[]) {
  const set = new Set<string>();
  for (const s of stations) set.add(s.city);

  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
