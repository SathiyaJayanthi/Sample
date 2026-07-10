import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const fallbackCenter = { lat: 11.0168, lng: 76.9558 };

function MapCenter({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng], 13);
  }, [center, map]);

  return null;
}

const createMarkerIcon = (color) =>
  L.divIcon({
    html: `<span style="display:inline-block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 8px rgba(15,23,42,0.25);"></span>`,
    className: 'bg-transparent border-0',
  });

export function MapView({ center = fallbackCenter, markers = [], zoom = 13, height = '320px' }) {
  const viewCenter = center ?? fallbackCenter;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200" style={{ height }}>
      <MapContainer center={[viewCenter.lat, viewCenter.lng]} zoom={zoom} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={viewCenter} />
        {markers.map((marker) => {
          const position = [marker.lat ?? marker.location?.lat, marker.lng ?? marker.location?.lng];

          if (!position[0] || !position[1]) {
            return null;
          }

          return (
            <Marker key={marker.id} position={position} icon={createMarkerIcon(marker.color || '#16a34a')}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">{marker.title}</p>
                  {marker.description ? <p className="text-sm text-slate-600">{marker.description}</p> : null}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
