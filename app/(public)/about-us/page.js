import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, Gem } from "lucide-react";

export const metadata = {
  title: "About Us | Vivid Estates",
  description: "Learn about the heritage and philosophy behind Vivid Estates.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Our Legacy</h4>
            <h1 className="font-serif text-5xl md:text-7xl text-forest italic leading-tight">
              Curating <br /> Masterpieces Since 1993.
            </h1>
            <p className="text-forest/60 font-sans text-sm tracking-wide leading-loose max-w-lg">
              Vivid Estates is not merely a real estate brokerage; it is an institution dedicated to the preservation and transition of architectural heritage. We connect discerning collectors with properties that possess absolute singularity.
            </p>
          </div>
          <div className="relative h-[600px] luxury-border overflow-hidden ring-1 ring-gold/20">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Estate Heritage"
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-forest text-cream py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Our Philosophy</h4>
            <h2 className="font-serif text-4xl md:text-5xl italic">Uncompromising Elegance</h2>
            <div className="w-12 h-px bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-6 text-center md:text-left">
              <Award className="w-10 h-10 text-gold mx-auto md:mx-0" />
              <h3 className="font-serif text-2xl italic tracking-wide">Excellence</h3>
              <p className="text-[11px] uppercase tracking-widest text-cream/50 leading-relaxed">
                Every property in our portfolio undergoes a rigorous curation process ensuring only the highest standards of architectural integrity.
              </p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <ShieldCheck className="w-10 h-10 text-gold mx-auto md:mx-0" />
              <h3 className="font-serif text-2xl italic tracking-wide">Discretion</h3>
              <p className="text-[11px] uppercase tracking-widest text-cream/50 leading-relaxed">
                We operate with absolute confidentiality. The privacy of our distinguished clientele remains our paramount priority.
              </p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <Gem className="w-10 h-10 text-gold mx-auto md:mx-0" />
              <h3 className="font-serif text-2xl italic tracking-wide">Rarity</h3>
              <p className="text-[11px] uppercase tracking-widest text-cream/50 leading-relaxed">
                We do not deal in volume. We deal in exclusivity, focusing solely on estates that are as unique as the individuals who acquire them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Origin Section */}
      <section className="container mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[700px] luxury-border">
             <img
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200"
              alt="Founder Portrait"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-10 pl-0 lg:pl-10">
             <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">The Architect of Vivid</h4>
             <h2 className="font-serif text-4xl md:text-5xl text-forest italic leading-tight">
               "True luxury whispers <br /> it never shouts."
             </h2>
             <div className="w-16 h-px bg-gold/50"></div>
             <p className="text-forest/60 font-sans text-sm tracking-wide leading-loose">
                Founded by former architectural historians and luxury curators, Vivid Estates was born from a desire to treat exceptional real estate as fine art. We believe that behind every heavy oak door and marble foyer lies a narrative waiting to be continued. 
                <br /><br />
                Our team acts not as brokers, but as custodians of these narratives, ensuring a seamless transition of legacy from one generation to the next.
             </p>
             <div>
                <p className="font-serif text-xl italic text-forest">Julian Vance</p>
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold mt-2">Managing Director</p>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-8 py-16 pb-24 border-t border-gold/20 text-center">
        <h2 className="font-serif text-4xl text-forest italic mb-6">Begin Your Journey</h2>
        <p className="text-forest/50 font-sans text-xs uppercase tracking-widest mb-10 max-w-lg mx-auto leading-relaxed">
          Allow us to guide you towards your next architectural acquisition.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-4 bg-forest text-cream px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-colors duration-500 luxury-border"
        >
          View The Collection <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
