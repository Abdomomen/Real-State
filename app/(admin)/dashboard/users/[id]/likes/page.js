import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { userService } from "@/app/services/userService";
import PropertyCard from "@/app/components/PropertyCard";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default async function UserLikes({ params }){
    const { id } = await params;
    const admin = await getUser();
    if(!admin || admin.role !== "admin"){
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


    const report = await userService.getUserLikes(id);
    const { user, likes } = report;

    return (
        <div className="space-y-12">
            <header className="flex items-center justify-between border-b border-gold pb-8">
                <div className="space-y-4">
                    <Link href={`/dashboard/users/${id}`} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors font-bold mb-4 font-sans">
                        <ArrowLeft size={14} /> Back to Member Portfolio
                    </Link>
                    <h2 className="text-4xl font-serif text-charcoal flex items-center gap-4">
                        <Heart className="text-luxury-gold" />
                        Aesthetic <span className="italic">Interests.</span>
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold font-sans">Curated by {user.name}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {likes && likes.length > 0 ? (
                    likes.map((like, index) => (
                        <div key={like._id}>
                            {like.building ? (
                                <PropertyCard property={like.building} index={index} />
                            ) : (
                                <div className="h-full luxury-border p-8 bg-charcoal/5 flex items-center justify-center italic text-charcoal/20 text-xs">
                                    Asset Decommissioned
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-40 text-center luxury-border dashed">
                        <p className="font-serif italic text-charcoal/40 text-2xl">This collector has not yet expressed interest in specific structures.</p>
                    </div>
                )}
            </div>

            <footer className="pt-20 text-center border-t border-gold/10">
                <p className="text-[9px] uppercase tracking-[0.5em] text-charcoal/10 font-sans">Aesthetic Archive Records</p>
            </footer>
        </div>
    );
}