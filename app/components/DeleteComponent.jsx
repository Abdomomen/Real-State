"use client";

import { useRouter } from "next/navigation";

export default function DeleteComponent({ id, title }) {
    const router = useRouter();

    const handleDelete = async () => {
        // Fix: added confirmation dialog before deleting
        if (!confirm(`Are you sure you want to permanently delete "${title || "this building"}"? This action cannot be undone.`)) return;

        const response = await fetch(`/api/buildings/${id}`, {
            method: "DELETE",
        });
        const res = await response.json();
        if (res.success) {
            // Fix: refresh/redirect after successful deletion
            router.push("/dashboard/buildings");
            router.refresh();
        } else {
            alert(res.message || "Failed to delete building.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-900/50 hover:text-red-900 transition-all font-bold group/btn"
            title="Delete Building"
        >
            <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity mr-1">Delete</span>
            <div className="p-3 border border-red-900/20 hover:border-red-900 hover:bg-red-900/5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
            </div>
        </button>
    );
}
