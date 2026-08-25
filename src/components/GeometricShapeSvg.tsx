import React from 'react';
import { GeometricPattern } from '../data/pennickEngine';

interface GeometricShapeSvgProps {
  pattern: GeometricPattern;
  color?: string;
  size?: number;
  className?: string;
  isAnimated?: boolean;
}

export const GeometricShapeSvg: React.FC<GeometricShapeSvgProps> = ({
  pattern,
  color = '#f59e0b',
  size = 120,
  className = '',
  isAnimated = true,
}) => {
  const strokeColor = color;
  const fillColor = `${color}15`;

  const renderShape = () => {
    switch (pattern.svgType) {
      case 'triangle':
        return (
          <g>
            <polygon
              points="60,15 105,95 15,95"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
              className={isAnimated ? 'animate-pulse' : ''}
            />
            {/* Center triangulation vertex */}
            <circle cx="60" cy="68" r="4" fill={strokeColor} className={isAnimated ? 'animate-ping origin-center' : ''} />
            <circle cx="60" cy="68" r="4" fill={strokeColor} />
            <line x1="60" y1="15" x2="60" y2="68" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="105" y1="95" x2="60" y2="68" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="15" y1="95" x2="60" y2="68" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        );

      case 'spiral':
        return (
          <g>
            <path
              d="M60,60 m0,0 a5,5 0 0,1 5,5 a10,10 0 0,1 -10,10 a18,18 0 0,1 -18,-18 a28,28 0 0,1 28,-28 a40,40 0 0,1 40,40 a52,52 0 0,1 -52,52"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              className={isAnimated ? 'origin-center animate-[spin_8s_linear_infinite]' : ''}
            />
            <circle cx="60" cy="60" r="4" fill={strokeColor} className={isAnimated ? 'animate-pulse' : ''} />
          </g>
        );

      case 'grid':
        return (
          <g>
            <rect x="20" y="20" width="80" height="80" fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
            {/* Grid lines */}
            <line x1="40" y1="20" x2="40" y2="100" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            <line x1="60" y1="20" x2="60" y2="100" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            <line x1="80" y1="20" x2="80" y2="100" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="40" x2="100" y2="40" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="60" x2="100" y2="60" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="80" x2="100" y2="80" stroke={strokeColor} strokeWidth="1.5" opacity="0.6" />
            {/* Organic breaking curve representing flexibility and healing */}
            <path
              d="M25,25 Q60,80 95,95"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className={isAnimated ? 'animate-pulse' : ''}
            />
          </g>
        );

      case 'fracture':
        return (
          <g>
            <path
              d="M60,10 L52,38 L72,48 L45,78 L65,85 L58,110"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              className={isAnimated ? 'animate-pulse' : ''}
            />
            {/* Golden Kintsugi healing mending line */}
            <path
              d="M60,10 L52,38 L72,48 L45,78 L65,85 L58,110"
              fill="none"
              stroke="#fcd34d"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={isAnimated ? 'animate-ping opacity-75' : 'opacity-0'}
            />
            {/* Side stress fractures */}
            <path d="M52,38 L25,48" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M72,48 L95,42" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M45,78 L20,88" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M65,85 L98,80" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>
        );

      case 'circle':
        return (
          <g>
            <circle cx="60" cy="60" r="42" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" className={isAnimated ? 'animate-pulse' : ''} />
            <circle cx="60" cy="60" r="28" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" className={isAnimated ? 'origin-center animate-[spin_20s_linear_infinite]' : ''} />
            <circle cx="60" cy="60" r="14" fill="none" stroke={strokeColor} strokeWidth="1" />
            {/* Breakout tangential step arrow */}
            <path d="M102,60 L115,50 M115,50 L110,65" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" className={isAnimated ? 'animate-bounce' : ''} />
          </g>
        );

      case 'line':
        return (
          <g>
            <line x1="15" y1="60" x2="105" y2="60" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" className={isAnimated ? 'animate-pulse' : ''} />
            {/* Perpendicular halt stops */}
            <line x1="85" y1="35" x2="85" y2="85" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
            {/* Speed dash marks */}
            <line x1="25" y1="45" x2="55" y2="45" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="35" y1="75" x2="65" y2="75" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        );

      case 'wave':
        return (
          <g className={isAnimated ? 'animate-pulse' : ''}>
            <path
              d="M10,40 Q35,15 60,40 T110,40"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M10,65 Q35,40 60,65 T110,65"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M10,90 Q35,65 60,90 T110,90"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Keel anchor line */}
            <line x1="60" y1="65" x2="60" y2="105" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="60" cy="105" r="4" fill="#38bdf8" />
          </g>
        );

      case 'hexagon':
        return (
          <g className={isAnimated ? 'origin-center animate-[spin_30s_linear_infinite]' : ''}>
            <polygon
              points="60,18 95,38 95,82 60,102 25,82 25,38"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Internal honeycomb lines */}
            <line x1="60" y1="18" x2="60" y2="60" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="95" y1="82" x2="60" y2="60" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="25" y1="82" x2="60" y2="60" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="60" cy="60" r="4" fill={strokeColor} />
          </g>
        );

      case 'cube':
        return (
          <g className={isAnimated ? 'animate-pulse' : ''}>
            {/* Front face */}
            <rect x="35" y="45" width="45" height="45" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Top face */}
            <polygon points="35,45 55,25 100,25 80,45" fill={`${strokeColor}25`} stroke={strokeColor} strokeWidth="2" />
            {/* Right face */}
            <polygon points="80,45 100,25 100,70 80,90" fill={`${strokeColor}35`} stroke={strokeColor} strokeWidth="2" />
            {/* Light opening seam */}
            <line x1="55" y1="25" x2="80" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" className={isAnimated ? 'animate-ping' : ''} />
          </g>
        );

      case 'tetrahedron':
        return (
          <g>
            <polygon points="60,15 102,85 18,85" fill={fillColor} stroke={strokeColor} strokeWidth="2" className={isAnimated ? 'animate-pulse' : ''} />
            <line x1="60" y1="15" x2="60" y2="65" stroke={strokeColor} strokeWidth="2" />
            <line x1="18" y1="85" x2="60" y2="65" stroke={strokeColor} strokeWidth="2" />
            <line x1="102" y1="85" x2="60" y2="65" stroke={strokeColor} strokeWidth="2" />
            <circle cx="60" cy="15" r="4" fill="#f43f5e" className={isAnimated ? 'animate-ping' : ''} />
            <circle cx="60" cy="15" r="4" fill="#f43f5e" />
          </g>
        );

      case 'fractal':
        return (
          <g className={isAnimated ? 'animate-pulse' : ''}>
            <polygon points="60,20 95,85 25,85" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <polygon points="60,85 77.5,52.5 42.5,52.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <polygon points="60,52.5 68.75,36.25 51.25,36.25" fill="none" stroke={strokeColor} strokeWidth="1" />
            <polygon points="42.5,85 51.25,68.75 33.75,68.75" fill="none" stroke={strokeColor} strokeWidth="1" />
            <polygon points="77.5,85 86.25,68.75 68.75,68.75" fill="none" stroke={strokeColor} strokeWidth="1" />
          </g>
        );

      case 'labyrinth':
        return (
          <g>
            <path
              d="M20,60 A40,40 0 1,1 100,60 A30,30 0 1,1 30,60 A20,20 0 1,1 90,60 A10,10 0 1,1 50,60"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              className={isAnimated ? 'animate-pulse' : ''}
            />
            <circle cx="60" cy="60" r="4" fill="#10b981" className={isAnimated ? 'animate-ping' : ''} />
            <circle cx="60" cy="60" r="4" fill="#10b981" />
          </g>
        );

      case 'crossroads':
        return (
          <g>
            <line x1="60" y1="15" x2="60" y2="105" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="60" x2="105" y2="60" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="60" r="14" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" className={isAnimated ? 'origin-center animate-[spin_15s_linear_infinite]' : ''} />
            <circle cx="60" cy="60" r="5" fill="#f59e0b" className={isAnimated ? 'animate-pulse' : ''} />
            {/* Decisive stone marker */}
            <circle cx="85" cy="60" r="4" fill="#38bdf8" className={isAnimated ? 'animate-bounce' : ''} />
          </g>
        );

      default:
        return (
          <circle cx="60" cy="60" r="40" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`select-none ${className}`}
    >
      <defs>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {renderShape()}
    </svg>
  );
};
