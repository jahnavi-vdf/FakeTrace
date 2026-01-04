
import React from 'react';
import { DetectionType } from '../types';

interface BottomNavProps {
  activeType: DetectionType;
  onChangeType: (type: DetectionType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeType, onChangeType }) => {
  const items: { id: DetectionType; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'image', 
      label: 'Image', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 
    },
    { 
      id: 'video', 
      label: 'Video', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> 
    },
    { 
      id: 'audio', 
      label: 'Audio', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> 
    },
  ];

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1500] w-[calc(100%-4rem)] max-w-sm">
      <div className="glass p-3 rounded-[3.5rem] border-white/60 shadow-[0_40px_100px_rgba(0,0,0,1)] flex items-center justify-between bg-white/20 backdrop-blur-[60px] border-2">
        {items.map((item) => {
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeType(item.id)}
              className={`relative flex-1 flex flex-col items-center gap-2 py-5 rounded-[2.5rem] transition-all duration-300 ${
                isActive 
                ? 'text-white scale-105' 
                : 'text-white/80 hover:text-white hover:scale-105'
              }`}
            >
              {/* THE "SPECIFIED" ACTIVE STATE - HIGHEST VISIBILITY */}
              {isActive && (
                <div className="absolute inset-0 bg-primary border-2 border-white/40 rounded-[2.5rem] animate-fadeIn shadow-[0_10px_30px_rgba(var(--primary-rgb),0.8)]" />
              )}
              
              <div className={`relative z-10 transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_white]' : ''}`}>
                {item.icon}
              </div>
              
              <span className={`relative z-10 text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'opacity-100 italic' : 'opacity-70'}`}>
                {item.label}
              </span>

              {/* SPECIFIED INDICATOR DOT */}
              {isActive && (
                <div className="absolute -bottom-1.5 w-3 h-1 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
