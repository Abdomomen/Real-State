"use client"

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLike({ id, likes: initialLikes, isLiked }) {
    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isPending, setIsPending] = useState(false); // لمنع الـ Spam clicks
    const router = useRouter();

    const handleLike = async () => {
        if (isPending) return; // لا تسمح بطلبات متكررة بسرعة

        // 1. Optimistic Update (تغيير فوري في الشاشة)
        const prevLiked = liked;
        const prevCount = likesCount;

        setLiked(!liked);
        setLikesCount(prevCount + (liked ? -1 : 1));
        setIsPending(true);

        try {
            const res = await fetch(`/api/buildings/${id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error("Like API Error:", res.status, errData?.message || errData);
                throw new Error(errData?.message || `Server Error ${res.status}`);
            }

            router.refresh();
        } catch (error) {
            setLiked(prevLiked);
            setLikesCount(prevCount);
            console.error("Like failed:", error.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button 
            onClick={handleLike}
            disabled={isPending}
            className="group flex items-center gap-3 px-6 py-3 border border-gold/40 hover:bg-gold/10 transition-all duration-300 rounded-sm text-forest mb-12 mt-4 disabled:opacity-70"
        >
            <Heart 
                className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    liked ? "fill-red-500 text-red-500" : "text-gold"
                }`} 
            />
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                    {liked ? "Saved" : "Add to Favorites"}
                </span>
                <span className="text-[11px] font-medium text-gold/80">
                    {likesCount} {likesCount === 1 ? 'Interest' : 'Interests'}
                </span>
            </div>
        </button>
    );
}