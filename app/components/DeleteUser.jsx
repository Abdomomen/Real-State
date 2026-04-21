"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteUser({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to terminate this user?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className={`p-3 bg-white border border-red-900/10 hover:border-red-900/30 transition-all shadow-sm ${loading ? 'text-red-900/50' : 'text-red-900/60 hover:text-red-900'}`}
      title="Terminate Access"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
