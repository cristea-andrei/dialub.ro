"use client";

import dynamic from "next/dynamic";

/**
 * Leaflet touches `window` at import time, so the map can only be loaded
 * client-side — and `ssr: false` is only allowed from a client component.
 */
const OfficeMap = dynamic(() => import("@/components/office-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-mist" />,
});

export function OfficeMapEmbed() {
  return <OfficeMap />;
}
