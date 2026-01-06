import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import * as L from "leaflet";
import type { Station } from "../types";

export function MarkerLayer({
  stations,
  selectedId,
  onSelect,
}: {
  stations: Station[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <>
      {stations.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.lat, s.lng] as [number, number]}
          radius={selectedId === s.id ? 8 : 6}
          pathOptions={{ color: selectedId === s.id ? "#f00" : "#3388ff" }}
          eventHandlers={{ click: () => onSelect(s.id) }}
        >
          <Popup>{s.name ?? `Station ${s.id}`}</Popup>
        </CircleMarker>
      ))}
    </>
  );
}

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const GERMANY_ZOOM = 6;
const FOCUS_ZOOM = 13;

export function StationsMap({
  stations,
  selectedStation,
  onSelectStation,
}: {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (id: number) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);

  const positions = useMemo(
    () => stations.map((s) => [s.lat, s.lng] as [number, number]),
    [stations]
  );

  // When a station is selected (from list), zoom & open popup.
  useEffect(() => {
    if (!selectedStation || !mapRef.current) return;

    mapRef.current.flyTo([selectedStation.lat, selectedStation.lng], FOCUS_ZOOM, {
      duration: 0.7,
    });
  }, [selectedStation]);

  // If filtering leaves only a few stations, fit bounds (nice UX)
  useEffect(() => {
    if (!mapRef.current) return;
    if (positions.length === 0) return;

    // Don’t auto-fit if user is focused on a specific station
    if (selectedStation) return;

    if (positions.length === 1) {
      mapRef.current.setView(positions[0], FOCUS_ZOOM);
      return;
    }

    const bounds = L.latLngBounds(positions);
    mapRef.current.fitBounds(bounds, { padding: [24, 24] });
  }, [positions, selectedStation]);

  return (
    <MapContainer
      center={GERMANY_CENTER}
      zoom={GERMANY_ZOOM}
      className="h-full w-full"
      ref={(instance) => {
        mapRef.current = instance ?? null;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerLayer
        stations={stations}
        selectedId={selectedStation?.id ?? null}
        onSelect={onSelectStation}
      />
    </MapContainer>
  );
}
