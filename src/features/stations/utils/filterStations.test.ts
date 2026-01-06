import { describe, expect, it } from "vitest";
import { filterStations } from "./filterStations";
import type { Station } from "../types";

const stations: Station[] = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 1, lng: 1 },
  { id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 2, lng: 2 },
  { id: 3, name: "Berlin Ostbahnhof", city: "Berlin", lat: 3, lng: 3 },
];

describe("filterStations", () => {
  it("returns all stations when query is empty", () => {
    expect(filterStations(stations, "")).toHaveLength(3);
    expect(filterStations(stations, "   ")).toHaveLength(3);
  });

  it("filters by city case-insensitively", () => {
    const res = filterStations(stations, "ber");
    expect(res.map((s) => s.id)).toEqual([1, 3]);
  });
});
