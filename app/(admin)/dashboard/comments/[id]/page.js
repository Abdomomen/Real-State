import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { commentService } from "@/app/services/commentService";
import { MessageSquare, User, Building2, ArrowLeft, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import DeleteComment from "@/app/components/DeleteComment";
export default async function CommentDetail({ params }){
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


    const comment = await commentService.getCommentById(id);
    if (!comment) {
        redirect("/dashboard/comments");
    }

    return (
        <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
            <header className="flex items-center justify-between border-b border-gold pb-8">
                <div className="space-y-4">
                    <Link href="/dashboard/comments" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-forest/40 hover:text-charcoal transition-colors font-bold mb-4 font-sans">
                        <ArrowLeft size={14} /> Back to Moderation
                    </Link>
                    <h2 className="text-4xl font-serif text-charcoal">Social <span className="italic">Transmission.</span></h2>
                </div>
                {/* Fix: replaced broken /dashboard/comments/${id}/delete link with the actual DeleteComment component */}
                <DeleteComment id={id} />
            </header>

            <div className="border-gold/10 p-12 bg-forest/[0.02] space-y-10">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold">
                        <MessageSquare size={24} />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-forest/30 font-bold mb-1">Observation Date</p>
                        <p className="text-sm font-serif italic text-charcoal flex items-center gap-2 justify-end">
                            <Calendar size={14} /> {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <blockquote className="text-3xl md:text-4xl font-serif text-charcoal italic leading-relaxed border-l-4 border-gold pl-10">
                    "{comment.text}"
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gold/10">
                    <Link href={`/dashboard/users/${comment.user?._id}`} className="border-gold/10 p-8 hover:bg-forest hover:text-cream group transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-widest text-forest/40 group-hover:text-gold transition-colors mb-4 font-bold flex items-center gap-2">
                            <User size={12} /> Origin Subject
                        </p>
                        <h4 className="text-xl font-serif">{comment.user?.name || "Anonymous Collector"}</h4>
                        <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 mt-2 font-bold">View Member Dossier</p>
                    </Link>

                    <Link href={`/dashboard/buildings/${comment.building?._id}`} className="border-gold/10 p-8 hover:bg-forest hover:text-cream group transition-all duration-500">
                        <p className="text-[10px] uppercase tracking-widest text-forest/40 group-hover:text-gold transition-colors mb-4 font-bold flex items-center gap-2">
                            <Building2 size={12} /> Target Asset
                        </p>
                        <h4 className="text-xl font-serif">{comment.building?.title || "Unknown Structure"}</h4>
                        <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 mt-2 font-bold">View Asset Inventory</p>
                    </Link>
                </div>
            </div>

            <footer className="pt-20 text-center">
                <p className="text-[9px] uppercase tracking-[0.5em] text-charcoal/20 font-sans">Social Oversight Protocol Active</p>
            </footer>
        </div>
    );
}
