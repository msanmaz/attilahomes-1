"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { PropertyWithImages } from "@/lib/types";

type Props = {
  properties: PropertyWithImages[];
  hoveredId: string | null;
  onMarkerClick: (slug: string) => void;
  onMarkerHover: (id: string) => void;
  onMarkerLeave: () => void;
};

export default function ListingsMapClient({
  properties,
  hoveredId,
  onMarkerClick,
  onMarkerHover,
  onMarkerLeave,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, { marker: L.Marker; el: HTMLElement | null }>>({});

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([39.5, 28.5], 6);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);

    const bounds = L.latLngBounds([]);
    const markers: Record<string, { marker: L.Marker; el: HTMLElement | null }> = {};

    properties.forEach((p) => {
      if (!p.lat || !p.lng) return;

      const markerHtml = `<div class="attila-marker" data-id="${p.id}" style="
        background: #0f0f0f;
        border: 1.5px solid #c8a55c;
        color: #c8a55c;
        padding: 3px 8px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.85rem;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        cursor: pointer;
        position: relative;
      ">
        ${p.priceDisplay}
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
        iconAnchor: [40, 36],
      });

      const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);

      const coverUrl = p.images.find((i) => i.isCover)?.url || p.images[0]?.url;
      const popupHtml = `
        <div style="cursor:pointer" onclick="window.__goToProperty__('${p.slug}')">
          ${coverUrl ? `<img src="${coverUrl}" style="width:100%;height:130px;object-fit:cover;display:block;" />` : ""}
          <div style="padding:0.7rem 1rem;">
            <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#c8a55c;margin-bottom:0.2rem;">${p.neighborhood}, ${p.city}</div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:#f2ece0;margin-bottom:0.25rem;line-height:1.25;">${p.name}</div>
            <div style="font-size:0.65rem;color:#a09a8c;margin-bottom:0.4rem;">${p.bedrooms} yatak · ${p.bathrooms} banyo · ${p.sqft.toLocaleString()} m²</div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:#c8a55c;font-weight:500;">${p.priceDisplay}${p.priceNote ? `<span style="font-family:'Outfit',sans-serif;font-size:0.6rem;color:#6b6560;font-weight:400;margin-left:4px;">${p.priceNote}</span>` : ""}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        minWidth: 240,
        closeButton: true,
        offset: [0, -20],
      });

      marker.on("mouseover", () => onMarkerHover(p.id));
      marker.on("mouseout", () => onMarkerLeave());

      const el = marker.getElement();
      markers[p.id] = { marker, el: el || null };
      bounds.extend([p.lat, p.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

    markersRef.current = markers;
    mapInstance.current = map;

    (window as unknown as Record<string, unknown>).__goToProperty__ = (slug: string) => {
      onMarkerClick(slug);
    };

    return () => {
      map.remove();
      mapInstance.current = null;
      delete (window as unknown as Record<string, unknown>).__goToProperty__;
    };
  }, [properties, onMarkerClick, onMarkerHover, onMarkerLeave]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, { marker }]) => {
      const el = marker.getElement();
      if (!el) return;
      const markerDiv = el.querySelector(".attila-marker") as HTMLElement;
      if (!markerDiv) return;

      if (id === hoveredId) {
        markerDiv.style.background = "#c8a55c";
        markerDiv.style.color = "#0f0f0f";
        markerDiv.style.transform = "scale(1.12)";
        markerDiv.style.zIndex = "1000";
      } else {
        markerDiv.style.background = "#0f0f0f";
        markerDiv.style.color = "#c8a55c";
        markerDiv.style.transform = "scale(1)";
        markerDiv.style.zIndex = "";
      }
    });
  }, [hoveredId]);

  return <div ref={mapRef} className="w-full h-full" />;
}
