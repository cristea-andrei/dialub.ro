"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { Dealer } from "@/content/dealers";
import { telHref } from "@/content/dealers";

/**
 * OpenStreetMap + Leaflet — no API key, no third-party tracker on the page.
 * Rendered client-side only (see the dynamic import in the dealers page).
 */

// Leaflet's default marker assets are bundler-hostile; draw our own instead.
const pin = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `<span style="
      display:block;width:${active ? 30 : 24}px;height:${active ? 30 : 24}px;
      border-radius:9999px 9999px 9999px 2px;transform:rotate(-45deg);
      background:${active ? "#0b0b0b" : "#e3241c"};
      border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35);"></span>`,
    iconSize: [active ? 30 : 24, active ? 30 : 24],
    iconAnchor: [active ? 15 : 12, active ? 28 : 22],
    popupAnchor: [0, -22],
  });

function FitBounds({ dealers, active }: { dealers: Dealer[]; active: Dealer | null }) {
  const map = useMap();

  useEffect(() => {
    // the container is laid out after the map mounts, so tell Leaflet its size
    // before fitting — otherwise it fits against a stale viewport
    const id = window.setTimeout(() => {
      map.invalidateSize();
      if (active) {
        map.flyTo([active.lat, active.lng], 14, { duration: 0.7 });
        return;
      }
      if (!dealers.length) return;
      const bounds = L.latLngBounds(
        dealers.map((d) => [d.lat, d.lng] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 11 });
    }, 80);
    return () => window.clearTimeout(id);
  }, [map, dealers, active]);

  return null;
}

export default function DealerMap({
  dealers,
  activeId,
  onSelect,
}: {
  dealers: Dealer[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  const active = useMemo(
    () => dealers.find((d) => d.id === activeId) ?? null,
    [dealers, activeId],
  );
  const markerRefs = useRef<Record<number, L.Marker | null>>({});

  useEffect(() => {
    if (activeId != null) markerRefs.current[activeId]?.openPopup();
  }, [activeId]);

  return (
    <MapContainer
      center={[45.1, 26.0]}
      zoom={7}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#edf2f7" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <FitBounds dealers={dealers} active={active} />

      {dealers.map((d) => (
        <Marker
          key={d.id}
          position={[d.lat, d.lng]}
          icon={pin(d.id === activeId)}
          ref={(ref) => {
            markerRefs.current[d.id] = ref;
          }}
          eventHandlers={{ click: () => onSelect(d.id) }}
        >
          <Popup>
            <strong className="block text-[13px] font-semibold text-ink">{d.name}</strong>
            <span className="mt-1 block text-xs text-graphite">{d.address}</span>
            {d.phone && (
              <a
                href={telHref(d.phone)}
                className="mt-1 block text-xs font-medium text-pakelo-red"
              >
                {d.phone}
              </a>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
