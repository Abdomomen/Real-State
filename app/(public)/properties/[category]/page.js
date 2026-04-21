import { buildingService } from "@/app/services/buildingService";
import PropertyCard from "@/app/components/PropertyCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function CategoryProperties({ params }) {
    const { category } = await params;
    const buildings = await buildingService.getBuildingByCategoryName(category);
    
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Header / Breadcrumb */}
            <div className="container mx-auto px-8 mb-12">
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/50 mb-6">
                    <Link href="/properties" className="hover:text-gold transition-colors">Collections</Link>
                    <ChevronRight size={12} />
                    <span className="text-forest">{category}</span>
                </nav>
                <h1 className="text-5xl md:text-7xl font-serif text-forest italic animate-fade-in">
                    {category} <span className="text-gold">Portfolio</span>
                </h1>
                <div className="h-1 w-24 bg-gold mt-6" />
            </div>

            <div className="container mx-auto px-8">
                {buildings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {buildings.map((building, index) => (
                            <PropertyCard 
                                key={building._id} 
                                property={building} 
                                index={index} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center border border-dashed border-gold/30">
                        <p className="text-2xl font-serif text-forest/40 italic">
                            No properties found in this exclusive collection.
                        </p>
                        <Link 
                            href="/properties" 
                            className="inline-block mt-8 text-gold uppercase tracking-widest text-xs font-bold border-b border-gold pb-1"
                        >
                            Return to Collections
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}