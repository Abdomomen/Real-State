import { buildingService } from "@/app/services/buildingService";
import PropertyHero from "@/app/components/PropertyHero";
import InquiryForm from "@/app/components/InquiryForm";
import { BedDouble, Bath, Square, MapPin, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import getUser from "@/app/lib/getUser";
import AddComment from "@/app/components/AddComment";
import AddLike from "@/app/components/AddLike";
import AddToWish from "@/app/components/AddToWish";
export default async function PropertyDetail({ params }) {
    const { category, id } = await params;
    const user = await getUser();
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
              <img 
                src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg" 
                alt="Intruder Alert" 
                className="max-h-screen object-contain"
              />
            </div>
        );
    }

    const building = await buildingService.getBuildingById(id);
    const comments = await buildingService.getBuildingComments(id);
    const isLiked= await buildingService.isLiked(id,user._id)

    // shows comments 
    return (
        <main className="min-h-screen bg-cream">
            {/* Hero Section */}
            <PropertyHero building={building} />

            {/* Breadcrumbs */}
            <div className="container mx-auto px-8 pt-12">
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/40">
                    <Link href="/properties" className="hover:text-gold">Collections</Link>
                    <span>/</span>
                    <Link href={`/properties/${category}`} className="hover:text-gold">
                        {building.category?.name || (typeof building.category === 'string' ? building.category : category)}
                    </Link>
                    <span>/</span>
                    <span className="text-forest">{building.title || building.name}</span>
                </nav>
            </div>

            <section className="container mx-auto px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-20">
                        {/* Summary Header */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gold/20">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Bedrooms</p>
                                <div className="flex items-center gap-3 text-forest">
                                    <BedDouble size={20} className="text-gold" />
                                    <span className="text-xl font-serif italic">{building.bedrooms || building.beds || 0}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Bathrooms</p>
                                <div className="flex items-center gap-3 text-forest">
                                    <Bath size={20} className="text-gold" />
                                    <span className="text-xl font-serif italic">{building.bathrooms || building.baths || 0}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Total Area</p>
                                <div className="flex items-center gap-3 text-forest">
                                    <Square size={20} className="text-gold" />
                                    <span className="text-xl font-serif italic">{building.area?.toLocaleString() || 0} SQ.FT</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Year Built</p>
                                <div className="flex items-center gap-3 text-forest">
                                    <Calendar size={20} className="text-gold" />
                                    <span className="text-xl font-serif italic">{building.yearBuilt || '2024'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="max-w-3xl">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-8">The Narrative</h2>
                            <p className="text-2xl md:text-3xl font-serif text-forest italic leading-relaxed mb-10">
                                {building.description}
                            </p>
                        </div>

                        {/* Image Showcase */}
                        <div className="space-y-8">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Visual Portfolio</h2>
                            <div className="columns-1 md:columns-2 gap-8 space-y-8">
                                {building.images && building.images.length > 0 ? building.images.map((img, idx) => {
                                    const imgSrc = typeof img === 'string' ? img : (img.url || img.public_id || "https://images.unsplash.com/photo-1600607687940-4e2303c9574a?auto=format&fit=crop&q=80&w=2400");
                                    return (
                                        <div key={img.id || idx} className="luxury-border overflow-hidden bg-forest/5">
                                            <img 
                                                src={imgSrc} 
                                                alt={`${building.title || building.name} view ${idx + 1}`}
                                                className="w-full h-auto hover:scale-105 transition-transform duration-1000 object-cover"
                                            />
                                        </div>
                                    )
                                }) : (
                                    <div className="luxury-border overflow-hidden bg-forest/5">
                                        <img 
                                            src={building.mainImage || "https://images.unsplash.com/photo-1600607687940-4e2303c9574a?auto=format&fit=crop&q=80&w=2400"} 
                                            alt={`${building.title || building.name} main view`}
                                            className="w-full h-auto hover:scale-105 transition-transform duration-1000 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex flex-wrap gap-4">
                            <AddLike id={id} likes={building.likesCount} isLiked={isLiked} />
                            <AddToWish building={building} />
                        </div>
                        {/* Reviews / Comments Section */}
                        <div className="pt-20 border-t border-gold/20">
                             <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-12">Collector Feedback</h2>
                             <div className="grid gap-8">
                                {comments && comments.length > 0 ? (
                                    comments.map((comment, i) => (
                                        <div key={comment._id || i} className="p-10 luxury-border bg-forest/5 flex gap-8 italic">
                                            <div className="flex-1 space-y-4">
                                                <p className="text-lg font-serif text-forest">"{comment.text}"</p>
                                                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-forest/40">
                                                    <span>{comment.user?.name || "Private Collector"}</span>
                                                    <span className="text-gold">•</span>
                                                    <span>Verified Interest</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm font-serif italic text-forest/40">No public feedback has been recorded for this property.</p>
                                )}
                             </div>

                             <AddComment buildingId={id} />
                        </div>
                    </div>

                    {/* Right Column: Inquiry & Quick info */}
                    <div className="lg:col-span-1 space-y-12">
                        <InquiryForm buildingId={building._id} />
                        
                        <div className="p-10 luxury-panel">
                            <h3 className="text-xl font-serif mb-6 italic">Exclusivity Guaranteed</h3>
                            <ul className="space-y-4">
                                {[
                                    "Private VIP Concierge",
                                    "Heritage Protection Deed",
                                    "Secure Digital Asset Docs",
                                    "24/7 Security Portfolio"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-xs uppercase tracking-widest text-cream/70 font-bold">
                                        <ShieldCheck size={14} className="text-gold shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
