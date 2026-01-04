
import React from 'react';
import ScannerLogo from './ScannerLogo';
import { ThemeID } from '../types';
import { THEMES } from '../constants';

interface NavbarProps {
  currentTheme: ThemeID;
  onOpenThemes: () => void;
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTheme, onOpenThemes, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-10 py-5 rounded-full border-white shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
        <div 
          className="flex items-center gap-5 cursor-pointer group" 
          onClick={() => onNavigate('hero')}
        >
          <ScannerLogo size={58} />
          <span className="text-2xl sm:text-3xl font-black tracking-tighter transition-all group-hover:text-primary heading-glow" style={{ color: 'var(--text)' }}>
            FAKETRACE
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-20">
          <button onClick={() => onNavigate('hero')} className="text-[13px] font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Home</button>
          <button onClick={() => onNavigate('detection')} className="text-[13px] font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Forensics</button>
          <button onClick={() => onNavigate('api')} className="text-[13px] font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">API</button>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenThemes}
            className="flex items-center gap-4 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/30 transition-all border-2 border-white/40 glass group"
            style={{ color: 'var(--text)' }}
          >
            <svg className="w-6 h-6 text-white group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white group-hover:scale-105 transition-all whitespace-nowrap">
              INTERFACES
            </span>
          </button>
          <button 
            onClick={() => onNavigate('signin')} 
            className="hidden sm:block px-10 py-3.5 rounded-full bg-primary text-white font-black text-sm shadow-[0_15px_40px_rgba(var(--primary-rgb),0.6)] hover:scale-110 active:scale-95 transition-all uppercase italic tracking-tighter border-2 border-white/30"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
