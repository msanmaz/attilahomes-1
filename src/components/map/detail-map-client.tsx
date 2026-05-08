"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  name: string;
  price: string;
};

export default function DetailMapClient({ lat, lng, name, price }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    }).setView([lat, lng], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 },
    ).addTo(map);

    const markerHtml = `<div style="
      background: #0f0f0f;
      border: 1.5px solid #c8a55c;
      color: #c8a55c;
      padding: 4px 10px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      position: relative;
    ">
      ${price}
      <div style="
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0; height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #c8a55c;
      "></div>
    </div>`;

    const icon = L.divIcon({
      html: markerHtml,
      className: "",
      iconSize: undefined,
      iconAnchor: [40, 42],
    });

    L.marker([lat, lng], { icon }).addTo(map);

    L.circle([lat, lng], {
      radius: 300,
      color: "#c8a55c",
      weight: 1,
      fillColor: "#c8a55c",
      fillOpacity: 0.06,
      dashArray: "4 6",
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [lat, lng, name, price]);

  return <div ref={mapRef} className="w-full h-full" />;
}
