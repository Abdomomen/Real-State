"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ToastProvider";
import { PenLine, Send } from "lucide-react";

export default function AddComment({ buildingId }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/comments/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    buildingId: buildingId,
                    comment: text,
                }),
            });
            
            const data = await res.json();
            
            if (data.success) {
                setText("");
                showToast("Your feedback has been recorded in the archives.");
                router.refresh();
            } else {
                showToast(data.message || "Failed to transmit message.", "error");
            }
        } catch (error) {
            console.error("Comment submission error:", error);
            showToast("System error: Connection to archives failed.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-12 p-8 lg:p-12 luxury-border bg-forest/5 space-y-8">
            <div className="flex items-center gap-4 border-b border-gold/20 pb-6">
                <div className="w-10 h-10 bg-forest flex items-center justify-center text-gold">
                    <PenLine size={18} />
                </div>
                <div>
                    <h3 className="text-xl font-serif text-forest italic">Leave a Legacy</h3>
                    <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Contribution to the Architectural Narrative</p>
                </div>
            </div>

            <form onSubmit={handleAddComment} className="space-y-6">
                <div className="relative group">
                    <textarea 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share your perspective on this estate..."
                        rows={4}
                        required
                        className="w-full bg-transparent border-b border-forest/10 py-4 font-serif text-lg italic text-forest placeholder:text-forest/20 outline-none focus:border-gold transition-all duration-500 resize-none"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] bg-gold w-0 group-focus-within:w-full transition-all duration-700" />
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit"
                        disabled={loading || !text.trim()}
                        className="flex items-center gap-4 px-10 py-4 bg-forest text-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-forest-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-30 disabled:grayscale border border-gold shadow-xl shadow-forest/10 overflow-hidden relative group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {loading ? "Transmitting..." : "Submit Entry"}
                            {!loading && <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </span>
                        <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </form>
        </div>
    );
}

