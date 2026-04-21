import Navbar from "../components/Navbar";

export default function PublicLayout({ children }) {
  return (
    <main className="min-h-screen bg-eggshell overflow-x-hidden">
      <Navbar />
      
      {children}

      {/* Global Enriched Footer */}
      <footer className="py-32 px-8 bg-eggshell border-t border-border-light relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-16 md:gap-8">
          
          <div className="col-span-1 lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl text-charcoal">VIVID</h2>
              <p className="text-charcoal/40 font-sans text-xs max-w-xs leading-loose uppercase tracking-[0.2em]">
                The world's most exclusive portfolio of architectural masterpieces. Curation for the modern collector.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-luxury-gold" />
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-sans">Established</span>
                <span className="text-xs font-serif italic text-charcoal">MCMXCVIII</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40 font-sans">Portfolio</h4>
            <ul className="space-y-4 font-serif italic text-sm text-charcoal">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Residential</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Coastal</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Urban Loft</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Private Island</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40 font-sans">Navigation</h4>
            <ul className="space-y-4 font-serif italic text-sm text-charcoal">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">About Vivid</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Architects</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Journal</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40 font-sans">Social</h4>
            <ul className="space-y-4 font-serif italic text-sm text-charcoal">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Vimeo</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40 font-sans">Contact</h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-sans">Headquarters</p>
                <p className="text-xs font-serif text-charcoal italic">London SW1, UK</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-sans">Email</p>
                <p className="text-xs font-serif text-charcoal italic underline decoration-luxury-gold/30">concierge@vivid.estates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-[9px] uppercase tracking-[0.4em] text-charcoal/20 font-sans">
            © 2026 Vivid Editorial Real Estate. Produced by Antigravity Design.
          </p>
          <div className="flex items-center gap-12 text-[9px] uppercase tracking-[0.4em] text-charcoal/40 font-sans">
            <a href="#" className="hover:text-charcoal transition-colors">Legal & Privacy</a>
            <a href="#" className="hover:text-charcoal transition-colors">Ethics Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
