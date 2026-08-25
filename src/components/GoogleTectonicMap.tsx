import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { WorldMine } from '../types';
import { sound } from '../utils/audio';
import {
  MapPin,
  Search,
  Layers,
  Sparkles,
  Eye,
  Maximize2,
  Compass,
  Key,
  Globe,
  Sliders,
  Filter,
  Flame,
  CheckCircle2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { CartographicFigureSvg } from './CartographicFigureSvg';

interface GoogleTectonicMapProps {
  mines: WorldMine[];
  onSelectMine: (mine: WorldMine) => void;
  onCommuneWithMine: (mine: WorldMine) => void;
  onOpenUploader: () => void;
}

// Marker Clusterer Wrapper Component
const ClusteredMinesLayer: React.FC<{
  mines: WorldMine[];
  onMineClick: (mine: WorldMine) => void;
  selectedMine: WorldMine | null;
}> = ({ mines, onMineClick, selectedMine }) => {
  const map = useMap();
  const markerLib = useMapsLibrary('marker');
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
      });
    }
  }, [map]);

  // Update markers on mine list changes
  useEffect(() => {
    if (!clusterer.current || !map || !markerLib) return;

    clusterer.current.clearMarkers();
    markersRef.current = {};

    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

    if (markerLib.AdvancedMarkerElement) {
      mines.forEach((mine) => {
        const pinContainer = document.createElement('div');
        pinContainer.className = 'group cursor-pointer transform hover:scale-125 transition-transform';
        pinContainer.innerHTML = `
          <div style="background-color: ${mine.mineralColor}; box-shadow: 0 0 12px ${mine.mineralColor};" 
               class="w-4 h-4 rounded-full border-2 border-stone-900 flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-stone-950"></div>
          </div>
        `;

        const marker = new markerLib.AdvancedMarkerElement({
          map,
          position: { lat: mine.lat, lng: mine.lng },
          title: `${mine.name} (${mine.primaryMineral})`,
          content: pinContainer,
        });

        marker.addListener('click', () => {
          sound.playMineralClink();
          onMineClick(mine);
        });

        markersRef.current[mine.id] = marker;
        newMarkers.push(marker);
      });

      clusterer.current.addMarkers(newMarkers);
    }

    return () => {
      if (clusterer.current) {
        clusterer.current.clearMarkers();
      }
    };
  }, [map, mines, markerLib, onMineClick]);

  return null;
};

export const GoogleTectonicMap: React.FC<GoogleTectonicMapProps> = ({
  mines,
  onSelectMine,
  onCommuneWithMine,
  onOpenUploader,
}) => {
  // API Key handling: uses Vite env or user input
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [selectedMineralCategory, setSelectedMineralCategory] = useState<string>('All');
  const [activeMine, setActiveMine] = useState<WorldMine | null>(mines[0] || null);

  // Catch Google Maps auth failure gracefully
  useEffect(() => {
    (window as any).gm_authFailure = () => {
      console.warn('Google Maps authentication failure detected (ApiProjectMapError or invalid key)');
      setMapAuthError(true);
    };
    return () => {
      delete (window as any).gm_authFailure;
    };
  }, []);

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Polar/Antarctica'];
  const categories = [
    'All',
    'Precious Metals',
    'Noble Gems',
    'Battery & Modern Flux',
    'Chthonic Salts',
    'Alchemical & Vaporous',
    'Structural & Ferrous',
    'Atomic & Radiance',
    'Rare Earths & Magnetics',
  ];

  const filteredMines = useMemo(() => {
    return mines.filter((mine) => {
      const matchesCont = selectedContinent === 'All' || mine.continent === selectedContinent;
      const matchesCat = selectedMineralCategory === 'All' || mine.mineralCategory === selectedMineralCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        mine.name.toLowerCase().includes(q) ||
        mine.primaryMineral.toLowerCase().includes(q) ||
        mine.country.toLowerCase().includes(q) ||
        mine.feminineArchetype.toLowerCase().includes(q);
      return matchesCont && matchesCat && matchesSearch;
    });
  }, [mines, selectedContinent, selectedMineralCategory, searchQuery]);

  const handleSaveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    setMapAuthError(false);
    localStorage.setItem('subterranea_gmaps_key', trimmed);
    setShowKeyConfig(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Map Type Controls */}
      <div className="bg-stone-900/70 border border-amber-900/50 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across ${mines.length.toLocaleString()} world mines...`}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 font-serif"
          />
        </div>

        {/* Filters & Map Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Continent */}
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
          >
            {continents.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Continents' : c}
              </option>
            ))}
          </select>

          {/* Commodity Category */}
          <select
            value={selectedMineralCategory}
            onChange={(e) => setSelectedMineralCategory(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 font-serif focus:outline-none focus:border-amber-500/60"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Mineral Sectors' : cat}
              </option>
            ))}
          </select>

          {/* Map Layer Mode */}
          <div className="flex items-center rounded-xl bg-stone-950 border border-stone-800 p-0.5">
            {[
              { id: 'hybrid', label: 'Satellite' },
              { id: 'terrain', label: 'Terrain' },
              { id: 'roadmap', label: 'Carto' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setMapType(t.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-serif transition-colors ${
                  mapType === t.id
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* API Key Config Button */}
          <button
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className={`px-3 py-2 rounded-xl text-xs font-serif border flex items-center gap-1.5 transition-all ${
              apiKey
                ? 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/40'
                : 'bg-amber-950/80 border-amber-500/60 text-amber-300 animate-pulse'
            }`}
            title="Google Maps API Key Configuration"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>{apiKey ? 'Maps API Ready' : 'Configure API Key'}</span>
          </button>
        </div>
      </div>

      {/* API Key Modal / Banner */}
      {showKeyConfig && (
        <div className="bg-amber-950/40 border border-amber-600/40 rounded-2xl p-4 text-xs font-serif text-amber-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Key className="w-4 h-4" /> Google Maps Platform API Key
            </p>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Enter your Google Maps JavaScript API key or use the free Maps Demo Key for prototyping.
              Maps renders satellite excavations, mountain topographies, and clustered markers for all {mines.length.toLocaleString()} mines.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-100 placeholder-stone-600 font-mono flex-1 md:w-48"
            />
            <button
              onClick={() => handleSaveApiKey(keyInput)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Google Map Canvas (Left) + Selected Mine Spirit (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Google Map */}
        <div className="lg:col-span-8 bg-stone-950 border border-amber-950/70 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-[650px]">
          {/* Header Bar */}
          <div className="px-4 py-2.5 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between text-xs font-serif text-stone-400 z-10">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-stone-200 uppercase tracking-widest text-[10px]">
                Google Maps Global Mining Stratigraphy
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-amber-400 font-bold">
                {filteredMines.length.toLocaleString()} Mines Visible
              </span>
              <button
                onClick={onOpenUploader}
                className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600/40 text-amber-300 hover:bg-amber-900 transition-colors text-[10px]"
              >
                + Upload Thousands More
              </button>
            </div>
          </div>

          {/* Google Maps Container */}
          <div className="flex-1 w-full relative bg-stone-950">
            {apiKey && !mapAuthError ? (
              <APIProvider apiKey={apiKey} onError={() => setMapAuthError(true)}>
                <Map
                  mapId="DEMO_MAP_ID"
                  style={{ width: '100%', height: '100%' }}
                  defaultCenter={{ lat: 20.0, lng: 10.0 }}
                  defaultZoom={2}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  mapTypeId={mapType}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                >
                  <ClusteredMinesLayer
                    mines={filteredMines}
                    onMineClick={(mine) => {
                      setActiveMine(mine);
                    }}
                    selectedMine={activeMine}
                  />
                </Map>
              </APIProvider>
            ) : (
              /* Fallback & Setup Screen when Google Maps API Key is pending or has Project Error */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-950/95 z-0 overflow-y-auto">
                <div className="max-w-md w-full bg-stone-900/90 border border-amber-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                    <Globe className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-100 mb-1">
                    Google Maps Satellite Stratigraphy
                  </h3>
                  <p className="text-xs text-stone-400 font-serif leading-relaxed mb-4">
                    {mapAuthError
                      ? 'The current Google Maps API Key encountered a project error (ApiProjectMapError). Enter a valid Maps API key or use the free Maps Demo Key below.'
                      : `To enable satellite imagery and global marker clustering across all ${mines.length.toLocaleString()} world mines, enter your Google Maps API Key.`}
                  </p>

                  {/* API Key Form */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="AIzaSy..."
                        className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-600 font-mono flex-1 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleSaveApiKey(keyInput)}
                        className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-serif font-bold text-xs hover:bg-amber-400 transition-colors shadow-md"
                      >
                        Activate
                      </button>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
                      <a
                        href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-serif text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1"
                      >
                        <Key className="w-3 h-3" /> Get Free Maps Demo Key (No Billing Setup)
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mini interactive mine scatter preview */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1 max-w-lg opacity-70">
                  {filteredMines.slice(0, 48).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMine(m)}
                      title={`${m.name} (${m.primaryMineral})`}
                      className="w-2.5 h-2.5 rounded-full transition-transform hover:scale-150"
                      style={{ backgroundColor: m.mineralColor }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-stone-500 mt-2">
                  Plotted {filteredMines.length.toLocaleString()} locations in local coordinate space
                </span>
              </div>
            )}
          </div>

          {/* Bottom Bar Info */}
          <div className="px-4 py-2 bg-stone-950/90 border-t border-stone-900 flex items-center justify-between text-[11px] text-stone-500 font-serif">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Zoom in to expand marker clusters into individual excavation shafts</span>
            </div>
            <div className="font-mono text-amber-400/80">
              Clusters active for {filteredMines.length.toLocaleString()} locations
            </div>
          </div>
        </div>

        {/* Right: Selected Mine Cartographic Spirit & Oracle Communion */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {activeMine ? (
            <div className="bg-stone-900/70 border border-stone-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between h-full">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-[10px] font-serif uppercase tracking-widest text-amber-400 font-bold">
                    {activeMine.continent} · -{activeMine.depthMeters}m
                  </span>
                  <button
                    onClick={() => onSelectMine(activeMine)}
                    className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                    title="Open Full Lore Modal"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-xl font-serif font-bold text-stone-100 mt-2">
                  {activeMine.name}
                </h3>
                <p className="text-xs text-stone-400 font-mono mb-3">
                  {activeMine.location}, {activeMine.country} · ({activeMine.lat.toFixed(2)}, {activeMine.lng.toFixed(2)})
                </p>

                {/* Mineral Badge */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-lg font-serif font-bold border"
                    style={{
                      backgroundColor: `${activeMine.mineralColor}20`,
                      borderColor: `${activeMine.mineralColor}60`,
                      color: activeMine.mineralColor,
                    }}
                  >
                    {activeMine.primaryMineral}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 font-serif">
                    {activeMine.depthCategory}
                  </span>
                </div>

                {/* Deity Lore & SVG Cartographic Plate */}
                <div className="my-2 p-3 bg-stone-950/80 rounded-2xl border border-stone-800/80">
                  <p className="text-[11px] font-serif italic text-amber-300/90 mb-2">
                    "{activeMine.feminineArchetype}"
                  </p>
                  <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-4">
                    {activeMine.cartographicFigure}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-800">
                <button
                  onClick={() => onCommuneWithMine(activeMine)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Commune in Oracle Chamber
                </button>
                <button
                  onClick={() => onSelectMine(activeMine)}
                  className="w-full py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white text-xs font-serif flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Stratigraphy Lore
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full">
              <Compass className="w-12 h-12 text-stone-600 mb-3" />
              <p className="text-sm font-serif text-stone-400">
                Click any mine marker or cluster on the Google Map to inspect its subterranean sovereign.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
