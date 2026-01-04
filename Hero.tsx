
import React from 'react';

interface HeroProps {
  onSystemDemo: () => void;
  onStartAnalysis: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSystemDemo, onStartAnalysis }) => {
  return (
    <section className="relative pt-60 pb-32 px-6 overflow-hidden">
      {/* Light spills */}
      <div className="absolute top-20 -left-20 w-[40rem] h-[40rem] bg-primary/30 rounded-full blur-[180px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-0 w-[45rem] h-[45rem] bg-secondary/20 rounded-full blur-[200px] pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border-2 border-primary text-primary text-[11px] font-black tracking-[0.5em] uppercase mb-16 bg-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)]">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_20px_var(--primary)]" />
          Neural Forensic Core: ONLINE
        </div>
        
        <h1 className="text-8xl md:text-[10rem] font-black leading-[0.9] tracking-tighter mb-16 italic text-white drop-shadow-[0_20px_100px_rgba(0,0,0,0.8)] heading-glow">
          Trust, But <span className="text-primary glow-text">Verify.</span>
        </h1>
        
        <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-20 text-white font-black opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          Expose high-fidelity deepfakes with absolute forensic precision.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-10">
          <button 
            onClick={onStartAnalysis}
            className="group relative flex items-center gap-10 px-16 py-6 rounded-full border-2 border-white bg-primary hover:bg-white transition-all duration-500 active:scale-95 shadow-[0_25px_80px_rgba(var(--primary-rgb),0.8)]"
          >
            <span className="relative text-white font-black text-2xl uppercase tracking-[0.3em] italic group-hover:text-primary transition-colors">
              Verify Media
            </span>
            <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
              <svg className="w-6 h-6 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
          
          <button 
            onClick={onSystemDemo}
            className="px-14 py-6 rounded-full border-2 border-white/60 text-white font-black text-sm hover:text-white hover:bg-white/20 hover:border-white transition-all uppercase tracking-[0.4em] italic backdrop-blur-xl bg-black/20"
          >
            System Demo
          </button>
        </div>

        {/* HIGH-VISIBILITY BRANDING FOOTER HERO */}
        <div className="mt-40 flex flex-wrap justify-center gap-20 font-black text-[13px] tracking-[0.7em] text-white">
          <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] hover:scale-125 transition-transform cursor-default brightness-125">SECURELABS</span>
          <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] hover:scale-125 transition-transform cursor-default brightness-125">NEURALCORE</span>
          <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] hover:scale-125 transition-transform cursor-default brightness-125">VERIFY.AI</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
