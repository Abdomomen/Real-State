"use client"
import { useState } from "react";
import { MessageSquarePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddCommentAdmin({ role, buildingId, buildingName }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (role !== "admin") {
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

    const handleAddComment = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            // Fix: corrected URL from /api/comment/add to /api/comments/add (plural)
            const response = await fetch("/api/comments/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    buildingId,
                    comment: `Admin: ${text}`,
                }),
            });
            const res = await response.json();
            if (res.success) {
                setText("");
                router.refresh();
            } else {
                alert(res.message || "Failed to add comment.");
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred while adding the comment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-widest text-gold/60 font-bold mb-4">
                Append internal insight or public remark
            </p>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter narrative insight..."
                rows={4}
                className="w-full bg-forest-dark border border-gold/20 p-4 font-serif text-cream focus:border-gold outline-none resize-none transition-colors"
            />
            <button
                onClick={handleAddComment}
                disabled={loading || !text.trim()}
                className="flex items-center gap-3 px-8 py-4 bg-gold text-forest text-[10px] uppercase tracking-widest hover:bg-white transition-all font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <MessageSquarePlus size={16} />}
                {loading ? "Transmitting..." : "Append Insight"}
            </button>
        </div>
    );
}