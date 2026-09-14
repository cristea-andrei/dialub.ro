"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { site } from "@/lib/site";

/** Dialub's office and warehouse in Dobroești, Ilfov. */
const OFFICE: [number, number] = [44.4507, 26.1796];

const pin = L.divIcon({
  className: "",
  html: `<span style="
    display:block;width:28px;height:28px;
    border-radius:9999px 9999px 9999px 2px;transform:rotate(-45deg);
    background:#e3241c;border:3px solid #fff;
    box-shadow:0 4px 12px rgba(0,0,0,.35);"></span>`,
  iconSize: [28, 28],
  iconAnchor: [14, 26],
  popupAnchor: [0, -24],
});

/** The container is sized after mount, so re-measure before Leaflet settles. */
function Resize() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 80);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

export default function OfficeMap() {
  return (
    <MapContainer
      center={OFFICE}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#edf2f7" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <Resize />
      <Marker position={OFFICE} icon={pin}>
        <Popup>
          <strong className="block text-[13px] font-semibold">{site.name}</strong>
          <span className="mt-1 block text-xs">
            Str. Gheorghe Dascălu nr. 4, Dobroești, Ilfov
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
