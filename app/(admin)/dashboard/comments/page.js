import getUser from "@/app/lib/getUser";
import { commentService } from "@/app/services/commentService";
import DeleteComment from "@/app/components/DeleteComment";

export default async function CommentsPage() {
  const user = await getUser();
  if (!user || user.role !== "admin") {
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

  const comments = await commentService.getAllComments();

  

  return (
    <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
      <header className="space-y-4 border-b border-gold/20 pb-12">
        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/30 font-sans">Public Discourse</h4>
        <h2 className="text-5xl md:text-6xl font-serif text-forest leading-tight">Insight <span className="italic text-gold">Moderation.</span></h2>
      </header>

      <div className="space-y-8">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-12 bg-cream/30 border border-gold/10 flex flex-col md:flex-row gap-12 group hover:bg-white hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
            >
              <div className="flex-1 space-y-8 relative z-10">
                 <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span className="text-forest border-b border-gold pb-1">{comment.user?.name || "Anonymous Curator"}</span>
                    <span className="text-gold/30">—</span>
                    <span className="text-forest/40 italic font-serif lowercase tracking-normal text-sm">regarding</span>
                    <span className="text-gold tracking-widest">{comment.building?.title || "Exclusive Estate"}</span>
                 </div>
                 
                 <div className="relative">
                   <span className="absolute -top-4 -left-6 text-6xl font-serif text-gold/10">"</span>
                   <p className="text-2xl font-serif text-forest italic leading-relaxed pr-12">
                     {comment.text}
                   </p>
                   <span className="absolute -bottom-10 right-12 text-6xl font-serif text-gold/10 rotate-180">"</span>
                 </div>

                 <div className="flex items-center gap-8 pt-4 border-t border-gold/5">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-forest/50 font-bold">Logged On</span>
                      <span className="text-xs font-serif italic text-forest/30">{new Date(comment.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                   </div>
                   <div className="w-[1px] h-6 bg-gold/10" />
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]" />
                      <span className="text-[10px] uppercase tracking-widest text-forest/60 font-bold">Public Archive</span>
                   </div>
                 </div>
              </div>

              <div className="flex md:flex-col justify-end md:justify-center gap-4 relative z-10">
                 <DeleteComment id={comment._id} />
              </div>
            </div>
          ))
        ) : (
          <div className="py-40 text-center bg-cream/50 border border-dashed border-gold/30">
             <p className="text-[10px] uppercase tracking-[0.5em] text-forest/20 font-bold italic">No feedback has been recorded in the public archives.</p>
          </div>
        )}
      </div>
    </div>
  );
}
