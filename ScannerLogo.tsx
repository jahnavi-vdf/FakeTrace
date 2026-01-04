
import React from 'react';

const ScannerLogo: React.FC<{ size?: number }> = ({ size = 52 }) => {
  return (
    <div 
      className="relative flex items-center justify-center overflow-hidden rounded-full border-2 border-primary transition-all duration-300 shadow-[0_0_60px_rgba(var(--primary-rgb),0.6)] bg-primary/20 group-hover:bg-primary/40 group-hover:border-white/50"
      style={{ width: size, height: size }}
    >
      {/* Scanning Laser Line */}
      <div className="scan-line z-50" />
      
      {/* High-Fidelity Fingerprint Pattern - Ultra High Contrast */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-1">
        <img 
          src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=200"
          alt="Fingerprint Trace"
          className="w-full h-full object-cover rounded-full opacity-100 transition-all duration-700 group-hover:scale-125"
          style={{ 
            filter: 'brightness(4.5) contrast(3) grayscale(1) invert(1) drop-shadow(0 0 20px var(--primary))',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      {/* Centered Initials FT - Ultra Bright Glow */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <span 
          className="text-white font-black italic tracking-tighter leading-none select-none animate-pulse"
          style={{ 
            fontSize: `${size * 0.48}px`,
            fontFamily: "'JetBrains Mono', monospace",
            filter: 'drop-shadow(0 0 10px #fff)',
            textShadow: '0 0 20px var(--primary), 0 0 40px var(--primary), 0 0 80px var(--primary), 0 0 120px rgba(var(--primary-rgb), 0.8)'
          }}
        >
          FT
        </span>
      </div>

      {/* Forensic HUD Overlay - Brighter stroke */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full z-20 fill-none stroke-primary"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin-slow opacity-80" />
        <circle cx="50" cy="50" r="46" strokeWidth="1.5" strokeDasharray="15 35" className="animate-spin-reverse opacity-60" />
        
        {/* HUD Crosshair Markers */}
        <g strokeWidth="3" strokeLinecap="round" className="glow-primary">
          <path d="M50 0 L50 15" />
          <path d="M50 100 L50 85" />
          <path d="M0 50 L15 50" />
          <path d="M100 50 L85 50" />
        </g>
        
        {/* Corner Brackets */}
        <path d="M20 10 A 45 45 0 0 1 80 10" strokeWidth="1.2" opacity="0.6" />
        <path d="M20 90 A 45 45 0 0 0 80 90" strokeWidth="1.2" opacity="0.6" />
      </svg>

      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
          transform-origin: center;
        }
        .animate-spin-reverse {
          animation: spin-reverse 18s linear infinite;
          transform-origin: center;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ScannerLogo;
