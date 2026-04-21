"use client";

import useUserStore from "@/app/stores/userStore";
import { Bookmark, Trash2, ArrowRight, BedDouble, Bath, Square } from "lucide-react";
import Link from "next/link";

export default function WishList() {
    const { wishList, removeFromWishList } = useUserStore();

    return (
        <main className="min-h-screen bg-cream pt-32 pb-20">
            <div className="container mx-auto px-8">
                {/* Header */}
                <div className="border-b border-gold/20 pb-10 mb-16">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-4">
                        Your Collection
                    </p>
                    <div className="flex items-end justify-between">
                        <h1 className="font-serif text-5xl md:text-7xl text-forest italic">
                            Saved Properties
                        </h1>
                        <span className="font-serif text-2xl text-forest/40 italic">
                            {wishList.length} {wishList.length === 1 ? "Estate" : "Estates"}
                        </span>
                    </div>
                </div>

                {/* Empty State */}
                {wishList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
                        <Bookmark className="w-16 h-16 text-gold/30" />
                        <div className="space-y-3">
                            <p className="font-serif text-3xl text-forest/40 italic">
                                Your wishlist is empty
                            </p>
                            <p className="text-[11px] uppercase tracking-widest text-forest/30 font-bold">
                                Explore our collection and save your favourite estates
                            </p>
                        </div>
                        <Link
                            href="/properties"
                            className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-forest text-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors duration-300"
                        >
                            Browse Collection <ArrowRight size={14} />
                        </Link>
                    </div>
                )}

                {/* Grid */}
                {wishList.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {wishList.map((building) => {
                            const img =
                                building.images?.[0]?.url ||
                                building.images?.[0] ||
                                building.mainImage ||
                                "https://images.unsplash.com/photo-1600607687940-4e2303c9574a?auto=format&fit=crop&q=80&w=800";

                            const categorySlug =
                                building.category?.slug ||
                                building.category?.name ||
                                building.category ||
                                "all";

                            return (
                                <div key={building._id} className="group luxury-border bg-white overflow-hidden flex flex-col">
                                    {/* Image */}
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={img}
                                            alt={building.title || building.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromWishList(building)}
                                            className="absolute top-4 right-4 p-2 bg-forest/80 backdrop-blur-sm text-cream hover:bg-red-600 transition-colors duration-300 rounded-sm"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1 gap-6">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold mb-2">
                                                {typeof building.category === "object"
                                                    ? building.category?.name
                                                    : building.category || "Estate"}
                                            </p>
                                            <h2 className="font-serif text-2xl text-forest italic leading-tight">
                                                {building.title || building.name}
                                            </h2>
                                            {building.location && (
                                                <p className="text-xs text-forest/50 mt-2 uppercase tracking-widest">
                                                    {building.location}
                                                </p>
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 text-forest/60 text-xs uppercase tracking-widest font-bold border-t border-gold/10 pt-4">
                                            {building.bedrooms && (
                                                <span className="flex items-center gap-1">
                                                    <BedDouble size={12} className="text-gold" />
                                                    {building.bedrooms}
                                                </span>
                                            )}
                                            {building.bathrooms && (
                                                <span className="flex items-center gap-1">
                                                    <Bath size={12} className="text-gold" />
                                                    {building.bathrooms}
                                                </span>
                                            )}
                                            {building.area && (
                                                <span className="flex items-center gap-1">
                                                    <Square size={12} className="text-gold" />
                                                    {building.area?.toLocaleString()} SQ.FT
                                                </span>
                                            )}
                                        </div>

                                        {/* Price & CTA */}
                                        <div className="flex items-center justify-between mt-auto">
                                            {building.price && (
                                                <p className="font-serif text-xl text-forest italic">
                                                    ${Number(building.price).toLocaleString()}
                                                </p>
                                            )}
                                            <Link
                                                href={`/properties/${categorySlug}/${building._id}`}
                                                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-gold hover:gap-4 transition-all duration-300"
                                            >
                                                View Estate <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
