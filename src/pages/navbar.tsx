export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-end">
        {/* BRANDING REMOVED FROM THIS SECTION */}

        {/* CONTACT GROUP - Pushed to the right using justify-end */}
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Get in touch</span>
          <div className="flex items-center">
            <a 
              href="https://www.instagram.com/pjs_shoes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 hover:text-orange-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}