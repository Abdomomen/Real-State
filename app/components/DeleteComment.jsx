"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteComment({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently erase this comment?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className={`px-6 py-3 border border-red-900/30 text-[10px] uppercase tracking-widest transition-all font-bold md:w-auto w-full flex items-center justify-center gap-2 ${loading ? 'text-red-900/50 bg-transparent' : 'text-red-900 hover:bg-red-900 hover:text-white'}`}
      title="Erase Record"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      {loading ? "Erasing..." : "Erase Record"}
    </button>
  );
}
