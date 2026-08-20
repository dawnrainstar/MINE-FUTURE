import React, { useState } from 'react';
import { WorldMine } from '../types';
import { Compass, Eye, Sparkles, Layers, Mountain, MapPin } from 'lucide-react';

interface CartographicFigureSvgProps {
  mine: WorldMine;
  className?: string;
  showControls?: boolean;
}

export const CartographicFigureSvg: React.FC<CartographicFigureSvgProps> = ({
  mine,
  className = 'w-full h-full',
  showControls = true,
}) => {
  const [viewMode, setViewMode] = useState<'combined' | 'cartography' | 'figure'>('combined');

  // Generate distinct SVG paths based on the mine's silhouette archetype
  const getSilhouettePath = () => {
    switch (mine.cartographicSilhouetteType) {
      case 'sleeping-titaness':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Reclining/Slumbering Mountain Titaness */}
            {/* Crown / Head resting in northern strata */}
            <path
              d="M 170 120 C 185 105, 215 105, 230 120 C 240 135, 235 155, 220 165 C 205 175, 180 170, 170 155 Z"
              fill={mine.mineralColor}
              fillOpacity="0.35"
              stroke={mine.mineralColor}
              strokeWidth="2.5"
            />
            {/* Crown / Peak ridge */}
            <path
              d="M 175 110 L 190 90 L 205 105 L 220 88 L 235 110"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Flowing hair into ore seams */}
            <path
              d="M 170 135 C 130 150, 100 200, 90 260 C 80 320, 120 380, 140 420"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.8"
            />
            <path
              d="M 180 150 C 140 180, 120 240, 110 300 C 105 350, 130 400, 160 450"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* Reclining Torso & Slumbering Arms */}
            <path
              d="M 220 165 C 250 185, 280 210, 290 250 C 300 290, 280 320, 240 335 C 200 350, 160 360, 130 380 C 100 400, 90 440, 110 470 C 130 500, 200 510, 280 500 C 340 490, 380 460, 390 420 C 400 380, 370 340, 340 310 C 310 280, 310 220, 270 180 Z"
              fill="url(#terreneGlow)"
              stroke={mine.mineralColor}
              strokeWidth="2"
            />
            {/* Heart Chamber / Deep Borehole Singularity */}
            <circle cx="230" cy="260" r="16" fill={mine.mineralColor} fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" />
            <circle cx="230" cy="260" r="6" fill="#fff" />
            <line x1="230" y1="210" x2="230" y2="310" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="180" y1="260" x2="280" y2="260" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        );

      case 'goddess-enthroned':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Royal Head & Radiating Sunburst / Mineral Halo */}
            <circle cx="250" cy="110" r="28" fill={mine.mineralColor} fillOpacity="0.3" stroke={mine.mineralColor} strokeWidth="2.5" />
            <path
              d="M 230 110 Q 250 85 270 110 Q 250 135 230 110 Z"
              fill="#fff"
              fillOpacity="0.9"
            />
            {/* Crown Spikes */}
            {[0, 30, 60, 90, 120, 150, 180].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 250 - Math.cos(rad) * 35;
              const y1 = 110 - Math.sin(rad) * 35;
              const x2 = 250 - Math.cos(rad) * 50;
              const y2 = 110 - Math.sin(rad) * 50;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />;
            })}
            {/* Regal Torso & Scepter of Mining Rights */}
            <path
              d="M 235 140 C 235 180, 220 220, 205 270 C 190 320, 185 360, 175 460 L 325 460 C 315 360, 310 320, 295 270 C 280 220, 265 140, 265 140 Z"
              fill="url(#terreneGlow)"
              stroke={mine.mineralColor}
              strokeWidth="2.5"
            />
            {/* Outstretched Arms Holding Cartographic Calipers */}
            <path
              d="M 235 170 C 180 190, 140 210, 110 250 C 90 280, 85 320, 75 350"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="2.5"
            />
            <path
              d="M 265 170 C 320 190, 360 210, 390 250 C 410 280, 415 320, 425 350"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="2.5"
            />
            {/* Concentric Amphitheater Terrace Skirt */}
            {[280, 330, 380, 430, 480].map((r, idx) => (
              <ellipse
                key={idx}
                cx="250"
                cy={r}
                rx={60 + idx * 30}
                ry={15 + idx * 6}
                fill="none"
                stroke={mine.mineralColor}
                strokeWidth={1.5}
                strokeDasharray={idx % 2 === 0 ? '6 3' : '2 2'}
                opacity={0.8}
              />
            ))}
          </g>
        );

      case 'dancing-nymph':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Leaping Electric/Air Maiden */}
            <circle cx="270" cy="115" r="22" fill={mine.mineralColor} fillOpacity="0.4" stroke={mine.mineralColor} strokeWidth="2" />
            {/* Arching Back & Dynamic Spine */}
            <path
              d="M 265 137 C 240 180, 230 230, 255 280 C 280 330, 260 390, 210 450"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Lightning bolt / Mineral ribbons */}
            <path
              d="M 270 115 Q 360 90 410 140 Q 370 200 440 260"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <path
              d="M 240 160 Q 150 140 100 190 Q 140 250 80 320"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="2"
            />
            {/* Floating legs over salt flats */}
            <path
              d="M 255 280 C 290 320, 340 360, 360 420"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="3"
            />
            <path
              d="M 255 280 C 230 330, 190 380, 170 440"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="3"
            />
            {/* Energy vortex rings */}
            <ellipse cx="255" cy="280" rx="90" ry="30" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="5 3" />
            <ellipse cx="255" cy="280" rx="140" ry="45" fill="none" stroke="#67e8f9" strokeWidth="1" opacity="0.5" />
          </g>
        );

      case 'veiled-oracle':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Flowing Veiled Headpiece */}
            <path
              d="M 250 85 C 200 85, 180 140, 170 220 C 160 300, 140 400, 120 480 L 380 480 C 360 400, 340 300, 330 220 C 320 140, 300 85, 250 85 Z"
              fill="url(#terreneGlow)"
              stroke={mine.mineralColor}
              strokeWidth="2.5"
            />
            {/* Mystic Eye of Revelation */}
            <circle cx="250" cy="160" r="18" fill="#000" stroke="#f59e0b" strokeWidth="2" />
            <ellipse cx="250" cy="160" rx="12" ry="7" fill={mine.mineralColor} />
            <circle cx="250" cy="160" r="4" fill="#fff" />
            {/* Crystalline Drapery Lines */}
            <path d="M 210 170 Q 250 200 290 170" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M 190 220 Q 250 260 310 220" fill="none" stroke={mine.mineralColor} strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M 170 280 Q 250 330 330 280" fill="none" stroke={mine.mineralColor} strokeWidth="1.5" />
            <path d="M 150 350 Q 250 410 350 350" fill="none" stroke="#fbbf24" strokeWidth="2" />
            {/* Clasped Hands at Heart Level */}
            <circle cx="250" cy="270" r="14" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 243 270 L 257 270" stroke="#fff" strokeWidth="2" />
          </g>
        );

      case 'warrior-chthonic':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Armored Valkyrie / Shield of Impact */}
            <circle cx="250" cy="100" r="24" fill={mine.mineralColor} fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="2.5" />
            {/* Winged Helmet */}
            <path d="M 226 100 L 190 65 L 215 90 Z" fill="#94a3b8" stroke="#f8fafc" strokeWidth="1.5" />
            <path d="M 274 100 L 310 65 L 285 90 Z" fill="#94a3b8" stroke="#f8fafc" strokeWidth="1.5" />
            {/* Massive Celestial Impact Shield */}
            <ellipse cx="180" cy="270" rx="75" ry="110" fill="url(#terreneGlow)" stroke="#f8fafc" strokeWidth="3" />
            <ellipse cx="180" cy="270" rx="55" ry="85" fill="none" stroke={mine.mineralColor} strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="180" y1="160" x2="180" y2="380" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="105" y1="270" x2="255" y2="270" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Spear of Deep Drilling */}
            <line x1="330" y1="40" x2="270" y2="480" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <polygon points="330,30 320,60 340,60" fill="#fbbf24" stroke="#fff" strokeWidth="1" />
          </g>
        );

      case 'winged-angelic-strata':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Diamond/Crystal Wings Sweeping the Polar Air */}
            {/* Left Wing */}
            <path
              d="M 230 160 C 180 120, 110 90, 50 120 C 70 190, 110 260, 210 280 Z"
              fill={mine.mineralColor}
              fillOpacity="0.25"
              stroke={mine.mineralColor}
              strokeWidth="2"
            />
            {/* Right Wing */}
            <path
              d="M 270 160 C 320 120, 390 90, 450 120 C 430 190, 390 260, 290 280 Z"
              fill={mine.mineralColor}
              fillOpacity="0.25"
              stroke={mine.mineralColor}
              strokeWidth="2"
            />
            {/* Crown & Slender Seraphic Form */}
            <circle cx="250" cy="110" r="22" fill="#fff" fillOpacity="0.3" stroke="#e0f2fe" strokeWidth="2" />
            <polygon points="250,75 240,95 260,95" fill="#38bdf8" />
            {/* Slender diamond torso */}
            <polygon points="250,135 225,230 250,330 275,230" fill="url(#terreneGlow)" stroke="#bae6fd" strokeWidth="2" />
            <line x1="250" y1="135" x2="250" y2="330" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="225" y1="230" x2="275" y2="230" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Vortex skirt plunging into pit */}
            <path d="M 225 330 L 250 480 L 275 330 Z" fill={mine.mineralColor} fillOpacity="0.4" stroke={mine.mineralColor} strokeWidth="2" />
          </g>
        );

      case 'water-bearer-saline':
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Mountain Nymph pouring subterranean torrents */}
            <circle cx="220" cy="120" r="24" fill={mine.mineralColor} fillOpacity="0.35" stroke={mine.mineralColor} strokeWidth="2" />
            {/* Urn / Alchemical Amphora */}
            <path
              d="M 280 140 C 310 130, 340 150, 330 190 C 320 220, 290 230, 280 200 Z"
              fill="#d97706"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            {/* Torrent of Golden Aqueducts / Alluvial Flow */}
            <path
              d="M 300 210 C 320 270, 360 320, 350 400 C 340 450, 280 470, 200 480"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 305 215 C 315 260, 345 305, 335 380 C 325 430, 260 460, 180 470"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            {/* Torso & Flowing Garments */}
            <path
              d="M 210 145 C 190 190, 180 240, 190 300 C 200 360, 180 420, 150 470 L 260 470 C 250 400, 260 320, 250 240 C 245 190, 230 145, 230 145 Z"
              fill="url(#terreneGlow)"
              stroke={mine.mineralColor}
              strokeWidth="2"
            />
          </g>
        );

      case 'serpentine-alchemist':
      default:
        return (
          <g className="transition-opacity duration-500" opacity={viewMode === 'cartography' ? 0.2 : 0.95}>
            {/* Sybil / Serpentine Alchemical Figure */}
            <circle cx="250" cy="115" r="24" fill={mine.mineralColor} fillOpacity="0.4" stroke={mine.mineralColor} strokeWidth="2.5" />
            <polygon points="250,70 235,95 265,95" fill="#f43f5e" />
            {/* Twin Mercury Flasks */}
            <circle cx="150" cy="200" r="18" fill="#fda4af" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="350" cy="200" r="18" fill="#fda4af" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="2" />
            {/* Serpentine ore vein undulating through crust */}
            <path
              d="M 250 140 C 200 180, 150 240, 210 290 C 270 340, 310 370, 250 430 C 200 480, 160 470, 130 460"
              fill="none"
              stroke={mine.mineralColor}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 250 140 C 300 180, 350 240, 290 290 C 230 340, 190 370, 250 430 C 300 480, 340 470, 370 460"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex flex-col items-center bg-stone-950/90 rounded-3xl border border-amber-950/60 p-4 sm:p-6 shadow-2xl overflow-hidden ${className}`}>
      {/* Antique Map Vignette Texture Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#b45309_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      
      {/* Decorative Cartographic Border & Corner Filigrees */}
      <div className="absolute inset-2 border-2 border-amber-600/30 rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 border border-amber-500/15 rounded-xl pointer-events-none" />
      
      {/* Corner Alchemical Seals */}
      <span className="absolute top-4 left-4 text-[10px] font-mono text-amber-500/60 select-none">🜂 LAT {mine.lat.toFixed(2)}°</span>
      <span className="absolute top-4 right-4 text-[10px] font-mono text-amber-500/60 select-none">🜄 LNG {mine.lng.toFixed(2)}°</span>
      <span className="absolute bottom-4 left-4 text-[10px] font-mono text-amber-500/60 select-none">🜃 -{mine.depthMeters}M</span>
      <span className="absolute bottom-4 right-4 text-[10px] font-mono text-amber-500/60 select-none">🜁 {mine.mineralCategory.toUpperCase()}</span>

      {/* Mode Controls Header */}
      {showControls && (
        <div className="z-10 w-full flex items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mine.mineralColor }} />
            <span className="text-xs font-serif font-bold text-amber-300 tracking-wide">
              Cartographic Spirit
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('combined')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-serif transition-colors ${
                viewMode === 'combined'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Overlay both Cartography and Feminine Spirit"
            >
              Unified Seam
            </button>
            <button
              onClick={() => setViewMode('figure')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-serif transition-colors ${
                viewMode === 'figure'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Show Anthropomorphic Feminine Figure"
            >
              Feminine Spirit
            </button>
            <button
              onClick={() => setViewMode('cartography')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-serif transition-colors ${
                viewMode === 'cartography'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Show Topographical Cartography & Contours"
            >
              Strata Contours
            </button>
          </div>
        </div>
      )}

      {/* Master SVG Canvas */}
      <div className="w-full aspect-square max-w-[480px] relative z-10 flex items-center justify-center">
        <svg
          viewBox="0 0 500 520"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] select-none"
        >
          <defs>
            <radialGradient id="terreneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={mine.mineralColor} stopOpacity="0.45" />
              <stop offset="60%" stopColor={mine.mineralColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="centerCompassGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* BACKGROUND CARTOGRAPHY GRID & RHUMB LINES */}
          <g className="transition-opacity duration-500" opacity={viewMode === 'figure' ? 0.25 : 0.85}>
            {/* Meridian & Parallel Circles */}
            <circle cx="250" cy="260" r="220" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="250" cy="260" r="170" fill="none" stroke="#78350f" strokeWidth="0.8" opacity="0.6" />
            <circle cx="250" cy="260" r="110" fill="none" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
            <circle cx="250" cy="260" r="50" fill="url(#centerCompassGlow)" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />

            {/* Rhumb lines radiating across the plate */}
            {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 250 + Math.cos(rad) * 230;
              const y2 = 260 + Math.sin(rad) * 230;
              return (
                <line
                  key={i}
                  x1="250"
                  y1="260"
                  x2={x2}
                  y2={y2}
                  stroke="#78350f"
                  strokeWidth="0.6"
                  opacity={angle % 90 === 0 ? 0.7 : 0.3}
                />
              );
            })}

            {/* Topographical Contour Strata Lines (The Earth's Curves) */}
            <path
              d="M 60 200 C 120 170, 180 220, 250 180 C 320 140, 380 190, 440 160"
              fill="none"
              stroke="#57534e"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            <path
              d="M 50 270 C 130 230, 200 290, 280 250 C 360 210, 410 280, 450 240"
              fill="none"
              stroke="#57534e"
              strokeWidth="1"
            />
            <path
              d="M 70 340 C 140 310, 210 370, 290 330 C 370 290, 410 360, 430 330"
              fill="none"
              stroke="#57534e"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <path
              d="M 80 410 C 160 380, 230 430, 310 390 C 380 360, 410 420, 420 410"
              fill="none"
              stroke="#57534e"
              strokeWidth="1"
            />

            {/* Subterranean Geological Fault Lines */}
            <path
              d="M 120 80 L 160 180 L 220 250 L 290 380 L 360 490"
              fill="none"
              stroke="#b45309"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              opacity="0.8"
            />
            <path
              d="M 380 90 L 340 170 L 260 260 L 210 370 L 150 480"
              fill="none"
              stroke="#b45309"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              opacity="0.8"
            />
          </g>

          {/* ANTHROPOMORPHIC FEMININE CARTOGRAPHIC SILHOUETTE */}
          {getSilhouettePath()}

          {/* CENTRAL ALCHEMICAL COMPASS ROSE */}
          <g transform="translate(250, 260)" opacity="0.6">
            <polygon points="0,-25 6,-6 25,0 6,6 0,25 -6,6 -25,0 -6,-6" fill="#f59e0b" />
            <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="#78350f" />
            <circle cx="0" cy="0" r="3" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* ANTIQUE CARTOUCHE PLATE BANNER */}
      <div className="z-10 w-full mt-3 bg-stone-900/90 border border-amber-500/40 rounded-2xl p-3.5 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <p className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-400 font-bold mb-0.5">
          {mine.cartoucheTitle}
        </p>
        <h4 className="text-sm font-serif font-bold text-stone-100 mb-1">
          {mine.feminineArchetype}
        </h4>
        <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-3 italic px-2">
          "{mine.cartographicFigure}"
        </p>
      </div>
    </div>
  );
};
