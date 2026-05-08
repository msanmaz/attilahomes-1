"use client";

import dynamic from "next/dynamic";
import type { PropertyWithImages } from "@/lib/types";

const DetailMapClient = dynamic(() => import("./detail-map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-card animate-pulse" />
  ),
});

const ListingsMapClient = dynamic(() => import("./listings-map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-card animate-pulse" />
  ),
});

export function DetailMap({
  lat,
  lng,
  name,
  price,
}: {
  lat: number;
  lng: number;
  name: string;
  price: string;
}) {
  return <DetailMapClient lat={lat} lng={lng} name={name} price={price} />;
}

export function ListingsMap({
  properties,
  hoveredId,
  onMarkerClick,
  onMarkerHover,
  onMarkerLeave,
}: {
  properties: PropertyWithImages[];
  hoveredId: string | null;
  onMarkerClick: (slug: string) => void;
  onMarkerHover: (id: string) => void;
  onMarkerLeave: () => void;
}) {
  return (
    <ListingsMapClient
      properties={properties}
      hoveredId={hoveredId}
      onMarkerClick={onMarkerClick}
      onMarkerHover={onMarkerHover}
      onMarkerLeave={onMarkerLeave}
    />
  );
}
