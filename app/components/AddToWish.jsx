"use client";

import { Bookmark } from "lucide-react";
import useUserStore from "@/app/stores/userStore";

export default function AddToWish({ building }) {
    const { wishList, addToWishList, removeFromWishList } = useUserStore();

    const isWished = wishList.some((item) => item._id === building._id);

    const handleToggle = () => {
        if (isWished) {
            removeFromWishList(building);
        } else {
            addToWishList(building);
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`group flex items-center gap-3 px-6 py-3 border transition-all duration-300 rounded-sm text-forest mb-12 mt-4 ${
                isWished
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gold/40 hover:bg-gold/10"
            }`}
        >
            <Bookmark
                className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                    isWished ? "fill-gold text-gold" : "text-gold"
                }`}
            />
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                    {isWished ? "Saved to Wishlist" : "Save to Wishlist"}
                </span>
                <span className="text-[11px] font-medium text-gold/80">
                    {isWished ? "Click to remove" : "Add to your collection"}
                </span>
            </div>
        </button>
    );
}
