"use client";

import { useEffect, useRef } from "react";

// Estilo del mapa: paleta azul Caribe Privé
const MAP_STYLES = [
  { elementType: "geometry",            stylers: [{ color: "#06234d" }] },
  { elementType: "labels.text.stroke",  stylers: [{ color: "#06234d" }] },
  { elementType: "labels.text.fill",    stylers: [{ color: "#8fa8c8" }] },
  { featureType: "road",                elementType: "geometry",           stylers: [{ color: "#0d3a72" }] },
  { featureType: "road",                elementType: "geometry.stroke",    stylers: [{ color: "#051c3b" }] },
  { featureType: "road",                elementType: "labels.text.fill",   stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway",        elementType: "geometry",           stylers: [{ color: "#0a3571" }] },
  { featureType: "road.highway",        elementType: "geometry.stroke",    stylers: [{ color: "#051c3b" }] },
  { featureType: "road.highway",        elementType: "labels.text.fill",   stylers: [{ color: "#c8d4e4" }] },
  { featureType: "water",               elementType: "geometry",           stylers: [{ color: "#1a4a7a" }] },
  { featureType: "water",               elementType: "labels.text.fill",   stylers: [{ color: "#515c6d" }] },
  { featureType: "water",               elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
  { featureType: "poi",                 elementType: "geometry",           stylers: [{ color: "#0a2d5a" }] },
  { featureType: "poi",                 elementType: "labels.text.fill",   stylers: [{ color: "#6f83a0" }] },
  { featureType: "poi.park",            elementType: "geometry",           stylers: [{ color: "#0a3266" }] },
  { featureType: "poi.park",            elementType: "labels.text.fill",   stylers: [{ color: "#3C7EBF" }] },
  { featureType: "transit",             elementType: "geometry",           stylers: [{ color: "#0a2d5a" }] },
  { featureType: "transit.station",     elementType: "labels.text.fill",   stylers: [{ color: "#d59563" }] },
  { featureType: "administrative",      elementType: "geometry.stroke",    stylers: [{ color: "#1a3d6b" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#64779a" }] },
];

export default function PropertyMap({ lat, lng, name, address }) {
  const mapRef    = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || typeof window === "undefined") return;

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 14,
        styles: MAP_STYLES,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Marker con ícono SVG amarillo
      const svgMarker = {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        fillColor: "#3FB0A0",
        fillOpacity: 1,
        strokeColor: "#0c1626",
        strokeWeight: 1.5,
        scale: 2,
        anchor: new window.google.maps.Point(12, 22),
      };

      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        icon: svgMarker,
        title: name,
      });

      // Info window al hacer click
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-family:Inter,sans-serif;padding:4px 2px;color:#0c1626;min-width:180px">
          <strong style="font-size:14px">${name}</strong>
          <p style="font-size:12px;color:#7c8597;margin:4px 0 0">${address}</p>
        </div>`,
      });

      markerRef.current.addListener("click", () => {
        infoWindow.open(map, markerRef.current);
      });
    };

    // Cargar el script de Google Maps si no está cargado
    if (window.google?.maps) {
      initMap();
      return;
    }

    const scriptId = "google-maps-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id  = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      document.getElementById(scriptId).addEventListener("load", initMap);
    }
  }, [lat, lng, name, address]);

  // Si no hay API key, mostrar placeholder estático
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-blue-deep/80 rounded-2xl gap-3 text-white/50 text-sm">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span>Mapa disponible con NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</span>
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow text-xs underline underline-offset-2"
        >
          Ver en Google Maps →
        </a>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
}
