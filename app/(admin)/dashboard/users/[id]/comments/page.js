import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { userService } from "@/app/services/userService";
import { MessageSquare, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default async function UserComments({ params }){
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


    const report = await userService.getUserComments(id);
    const { user, comments } = report;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex items-center justify-between border-b border-gold pb-8">
                <div className="space-y-4">
                    <Link href={`/dashboard/users/${id}`} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors font-bold mb-4 font-sans">
                        <ArrowLeft size={14} /> Back to Member Portfolio
                    </Link>
                    <h2 className="text-4xl font-serif text-charcoal flex items-center gap-4">
                        <MessageSquare className="text-luxury-gold" />
                        Historical <span className="italic">Logs.</span>
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold font-sans">Social Footprint of {user.name}</p>
                </div>
            </header>

            <div className="space-y-6">
                {comments && comments.length > 0 ? (
                    comments.map((comment, i) => (
                        <div key={comment._id} className="luxury-border p-10 bg-forest/[0.02] flex flex-col md:flex-row gap-10 group hover:bg-forest hover:text-eggshell transition-all duration-700">
                            <div className="flex-1 space-y-6">
                                <blockquote className="text-2xl font-serif italic leading-relaxed">
                                    "{comment.text}"
                                </blockquote>
                                <div className="flex items-center gap-6 text-[9px] uppercase tracking-widest font-bold">
                                    <span className="opacity-40">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    <span className="text-luxury-gold group-hover:text-gold">•</span>
                                    <span className="group-hover:text-gold">Verified Interlocution</span>
                                </div>
                            </div>

                            <Link href={`/dashboard/buildings/${comment.building?._id}`} className="md:w-64 luxury-border overflow-hidden bg-charcoal/5 group-hover:border-gold/30">
                                {comment.building ? (
                                    <div className="h-full relative overflow-hidden">
                                        <img src={comment.building.images?.[0]?.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-forest/20 group-hover:opacity-0 transition-opacity" />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="text-[8px] uppercase tracking-widest font-bold text-eggshell group-hover:text-luxury-gold drop-shadow-md">{comment.building.title}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center italic text-[10px] uppercase tracking-widest opacity-20">Asset Purged</div>
                                )}
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="py-40 text-center luxury-border dashed">
                        <p className="font-serif italic text-charcoal/40 text-2xl">This subject has left no textual imprint on the guild archives.</p>
                    </div>
                )}
            </div>

            <footer className="pt-20 text-center">
                <p className="text-[9px] uppercase tracking-[0.5em] text-charcoal/20 font-sans">Social Transmission Archive</p>
            </footer>
        </div>
    );
}