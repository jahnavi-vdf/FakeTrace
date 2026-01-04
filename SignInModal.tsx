
import React, { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full max-w-md glass rounded-[3rem] border-glass shadow-2xl overflow-hidden p-10 animate-zoomIn" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
            {isSignUp ? 'Create' : 'Access'} <span className="text-primary">Vault</span>
          </h2>
          <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Forensic Identity Verification</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Full Name</label>
              <input 
                type="text" 
                placeholder="Agent 001"
                className="w-full px-6 py-4 rounded-2xl glass border-glass bg-white/5 focus:border-primary/50 outline-none transition-all font-medium"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Email Address</label>
            <input 
              type="email" 
              placeholder="name@agency.ai"
              className="w-full px-6 py-4 rounded-2xl glass border-glass bg-white/5 focus:border-primary/50 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Security Credential</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl glass border-glass bg-white/5 focus:border-primary/50 outline-none transition-all font-medium"
            />
          </div>

          <button className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest italic shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
            {isSignUp ? 'Initialize Account' : 'Authenticate Identity'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-glass text-center space-y-6">
          <p className="text-xs opacity-40 font-bold uppercase tracking-widest">Or connect via encrypted channel</p>
          <div className="flex gap-4">
            <button className="flex-1 py-3 rounded-xl glass border-glass hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.712-7.392 2.712-6.64 0-12.032-5.392-12.032-12.032s5.392-12.032 12.032-12.032c3.576 0 6.136 1.416 8.12 3.32l2.304-2.304c-2.816-2.696-6.472-4.712-10.424-4.712-7.584 0-13.768 6.184-13.768 13.768s6.184 13.768 13.768 13.768c4.088 0 7.176-1.352 9.536-3.816 2.456-2.456 3.232-5.904 3.232-8.68 0-.832-.072-1.632-.208-2.368h-12.56z"/></svg>
            </button>
            <button className="flex-1 py-3 rounded-xl glass border-glass hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-8 w-full text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New investigator? Request Access'}
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
