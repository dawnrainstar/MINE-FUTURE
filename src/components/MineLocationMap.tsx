import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { WorldMine } from '../types';
import { MapPin, Globe, ExternalLink, Layers, Key, Compass, Navigation } from 'lucide-react';

interface MineLocationMapProps {
  mine: WorldMine;
}

export const MineLocationMap: React.FC<MineLocationMapProps> = ({ mine }) => {
  const defaultApiKey =
    (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
    (import.meta as any).env?.GOOGLE_MAPS_API_KEY ||
    '';

  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('subterranea_gmaps_key') || defaultApiKey;
  });
  const [keyInput, setKeyInput] = useState<string>(apiKey);
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);
  const [mapAuthError, setMapAuthError] = useState<boolean>(false);
  const [mapType, setMapType] = useState<string>('hybrid');

  useEffect(() => {
    (window as any).gm_authFailure = () => {
      console.warn('Google Maps authentication notice detected');
      setMapAuthError(true);
    };
    return () => {
      delete (window as any).gm_authFailure;
    };
  }, []);

  const handleSaveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    setMapAuthError(false);
    localStorage.setItem('subterranea_gmaps_key', trimmed);
    setShowKeyConfig(false);
  };

  const gmapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${mine.lat},${mine.lng}`;

  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
      {/* Header bar */}
      <div className="px-5 py-3 bg-stone-950/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
            Subterranean Coordinates & Stratigraphy
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Map Layer Mode */}
          <div className="flex items-center rounded-lg bg-stone-900 border border-stone-800 p-0.5">
            {[
              { id: 'hybrid', label: 'Satellite' },
              { id: 'terrain', label: 'Terrain' },
              { id: 'roadmap', label: 'Map' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMapType(t.id)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                  mapType === t.id
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <a
            href={gmapsExternalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-300 text-[11px] font-mono flex items-center gap-1 transition-all"
            title="Open in Google Maps"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="w-full h-64 sm:h-72 relative bg-stone-950">
        {apiKey && !mapAuthError ? (
          <APIProvider apiKey={apiKey} onError={() => setMapAuthError(true)}>
            <Map
              mapId="DEMO_MAP_ID"
              style={{ width: '100%', height: '100%' }}
              defaultCenter={{ lat: mine.lat, lng: mine.lng }}
              center={{ lat: mine.lat, lng: mine.lng }}
              defaultZoom={11}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              mapTypeId={mapType}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              <AdvancedMarker
                position={{ lat: mine.lat, lng: mine.lng }}
                title={`${mine.name} (${mine.primaryMineral})`}
              >
                <div className="group cursor-pointer transform hover:scale-125 transition-transform flex flex-col items-center">
                  <div
                    style={{
                      backgroundColor: mine.mineralColor || '#f59e0b',
                      boxShadow: `0 0 16px ${mine.mineralColor || '#f59e0b'}`,
                    }}
                    className="w-6 h-6 rounded-full border-2 border-stone-950 flex items-center justify-center animate-pulse"
                  >
                    <div className="w-2 h-2 rounded-full bg-stone-950"></div>
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-stone-950/90 border border-amber-500/40 text-[10px] font-mono text-amber-200 shadow-md whitespace-nowrap">
                    {mine.name} (-{mine.depthMeters}m)
                  </div>
                </div>
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : (
          /* Embedded Visual Fallback with Coordinates Card */
          <div className="absolute inset-0 bg-stone-950/95 flex flex-col justify-between p-5 border border-amber-950/40">
            {/* Top Stat row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Geographic Pinpoint:</span>
                <span className="text-amber-300 font-bold">
                  {mine.lat.toFixed(4)}°, {mine.lng.toFixed(4)}°
                </span>
              </div>
              <div className="text-stone-400">
                Depth: <span className="text-stone-200">-{mine.depthMeters}m</span> ({mine.depthCategory})
              </div>
            </div>

            {/* Center Pinpoint graphic */}
            <div className="text-center py-2 space-y-2">
              <div className="relative inline-block">
                <div
                  className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: `${mine.mineralColor || '#f59e0b'}20`,
                    boxShadow: `0 0 25px ${mine.mineralColor || '#f59e0b'}40`,
                  }}
                >
                  <MapPin className="w-6 h-6 text-amber-400 animate-bounce" />
                </div>
              </div>
              <div className="text-sm font-serif font-bold text-stone-100">
                {mine.name}
              </div>
              <p className="text-xs text-stone-400 font-sans max-w-sm mx-auto">
                {mine.location}, {mine.country} · {mine.continent}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-900 text-[11px]">
              <button
                type="button"
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                className="text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                <span>{showKeyConfig ? 'Hide Key Setup' : 'Connect Google Maps API Key'}</span>
              </button>

              <a
                href={gmapsExternalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-300 hover:underline font-mono flex items-center gap-1"
              >
                <span>Direct Satellite Coordinates</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Key Config input panel if toggled */}
      {showKeyConfig && (
        <div className="p-4 bg-amber-950/30 border-t border-amber-600/30 text-xs font-serif text-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="font-bold text-amber-300 flex items-center gap-1.5 justify-center sm:justify-start">
              <Key className="w-3.5 h-3.5" /> Google Maps API Key
            </div>
            <p className="text-[11px] text-stone-400">
              Provide a Google Maps Platform key or free Maps Demo Key for interactive panning.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-100 placeholder-stone-600 font-mono flex-1 sm:w-44"
            />
            <button
              type="button"
              onClick={() => handleSaveApiKey(keyInput)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 font-serif"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Footer Location Details */}
      <div className="px-5 py-2.5 bg-stone-950/80 border-t border-stone-900 flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-400">
        <div>
          <span className="text-stone-500">Lat:</span>{' '}
          <span className="text-stone-200 font-semibold">{mine.lat.toFixed(4)}°</span>
          <span className="text-stone-500 ml-2">Lng:</span>{' '}
          <span className="text-stone-200 font-semibold">{mine.lng.toFixed(4)}°</span>
        </div>
        <div className="text-amber-400/90 font-sans italic">
          "{mine.feminineArchetype}"
        </div>
      </div>
    </div>
  );
};
