"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: string;
  lng: string;
  onLatChange: (v: string) => void;
  onLngChange: (v: string) => void;
};

export default function LocationPicker({ lat, lng, onLatChange, onLngChange }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const markerIcon = useCallback(() => {
    const html = `<div style="
      background: #c8a55c;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid #0f0f0f;
      box-shadow: 0 0 0 2px #c8a55c, 0 4px 12px rgba(0,0,0,0.5);
    "></div>`;
    return L.divIcon({ html, className: "", iconSize: [16, 16], iconAnchor: [8, 8] });
  }, []);

  const placeMarker = useCallback(
    (map: L.Map, latNum: number, lngNum: number) => {
      if (markerRef.current) {
        markerRef.current.setLatLng([latNum, lngNum]);
      } else {
        markerRef.current = L.marker([latNum, lngNum], { icon: markerIcon() }).addTo(map);
      }
    },
    [markerIcon],
  );

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      markerRef.current = null;
    }

    const hasCoords = lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
    const center: L.LatLngExpression = hasCoords
      ? [parseFloat(lat), parseFloat(lng)]
      : [39.5, 28.5];
    const zoom = hasCoords ? 14 : 6;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView(center, zoom);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    if (hasCoords) {
      placeMarker(map, parseFloat(lat), parseFloat(lng));
    }

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat: clickLat, lng: clickLng } = e.latlng;
      onLatChange(clickLat.toFixed(6));
      onLngChange(clickLng.toFixed(6));
      placeMarker(map, clickLat, clickLng);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      markerRef.current = null;
    };
    // Only re-init when component mounts — coordinate updates are handled by the click handler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const hasCoords = lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
    if (hasCoords) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      placeMarker(mapInstance.current, latNum, lngNum);
      mapInstance.current.setView([latNum, lngNum], Math.max(mapInstance.current.getZoom(), 12));
    }
  }, [lat, lng, placeMarker]);

  return (
    <div className="space-y-3">
      <div
        ref={mapRef}
        className="w-full h-[300px] border border-border cursor-crosshair"
      />
      <p className="text-[0.65rem] text-text-muted">
        Haritaya tıklayarak konum seçin veya koordinatları elle girin.
      </p>
    </div>
  );
}
