import type { Station } from "./types";

const STATIONS_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

function isStationArray(value: unknown): value is Station[] {
  if (!Array.isArray(value)) return false;
  return value.every((s) => {
    if (typeof s !== "object" || s == null) return false;
    const r = s as Record<string, unknown>;
    return (
      typeof r.id === "number" &&
      typeof r.name === "string" &&
      typeof r.city === "string" &&
      typeof r.lat === "number" &&
      typeof r.lng === "number"
    );
  });
}

export async function fetchStations(signal?: AbortSignal): Promise<Station[]> {
  const res = await fetch(STATIONS_URL, { signal });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} while fetching stations`);
  }

  const json: unknown = await res.json();
  if (!isStationArray(json)) {
    throw new Error("Invalid stations payload shape");
  }

  return json;
}
