import Hero from "@/app/components/Hero";
import PhilosophySection from "@/app/components/PhilosophySection";
import PresenceSection from "@/app/components/PresenceSection";
import PropertyCard from "@/app/components/PropertyCard";
import { buildingService } from "@/app/services/buildingService";
import Link from "next/link";

export default async function LandingPage() {
  let buildings = [];
  try {
    buildings = await buildingService.getRecentBuildings(6);
  } catch (error) {
    console.error("Failed to fetch buildings for landing page:", error);
  }

  return (
    <main className="bg-eggshell">
      {/* 1. High-End Video/Image Hero */}
      <Hero />

      {/* 2. Philosophy & Brand Essence */}
      <PhilosophySection />

      {/* 3. Recent Collections (The Registry) */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-charcoal/5 pb-12">
          <div className="max-w-xl">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/40 font-sans font-bold mb-6">Recent Acquisitions</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
              Curated <span className="italic">Architectural</span> Registry.
            </h2>
          </div>
          <Link href="/properties" className="text-[10px] uppercase tracking-widest font-bold text-charcoal/60 hover:text-luxury-gold transition-colors block pb-2 border-b border-charcoal/10 hover:border-luxury-gold">
            Explore All Assets
          </Link>
        </header>

        {buildings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {buildings.map((building, idx) => (
              <PropertyCard key={building._id || idx} property={building} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center luxury-border dashed">
            <p className="font-serif italic text-2xl text-charcoal/30">The registry is currently being curated.</p>
          </div>
        )}
      </section>

      {/* 4. Global Presence */}
      <PresenceSection />

      {/* 5. Editorial CTA */}
      <section className="py-40 bg-charcoal text-eggshell text-center border-t border-luxury-gold/20">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
            Ready to define <br /> your next space?
          </h2>
          <p className="text-eggshell/40 font-sans text-xs uppercase tracking-[0.3em] leading-loose max-w-md mx-auto">
            Contact our concierge to discuss private viewings and off-market architectural opportunities.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
            <Link 
              href="/auth/register" 
              className="px-12 py-5 bg-eggshell text-charcoal font-sans text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold transition-colors duration-500"
            >
              Apply for Access
            </Link>
            <Link 
              href="#" 
              className="text-[10px] uppercase tracking-[0.4em] text-eggshell/60 hover:text-eggshell transition-colors font-sans border-b border-eggshell/20 pb-2"
            >
              View Journal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

