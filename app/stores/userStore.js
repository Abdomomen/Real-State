"use client";

import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createContext, useContext, useRef, useEffect } from "react";
import { useStore } from "zustand";

const createUserStore = () => {
    return createStore(
        persist(
            (set) => ({
                // Initial state
                wishList: [],
                user: null,

                // Actions
                addToWishList: (building) => set((state) => {
                    if (state.wishList.find((item) => item._id === building._id)) {
                        return { wishList: state.wishList };
                    }
                    return { wishList: [...state.wishList, building] };
                }),

                removeFromWishList: (building) => set((state) => {
                    return { wishList: state.wishList.filter((item) => item._id !== building._id) };
                }),
                
                login: (userData) => set({ user: userData }),
                logout: () => set({ user: null }),
            }),
            {
                name: "user-store",
                skipHydration: true, // Prevents Next.js hydration mismatch
            }
        )
    );
};

export const UserStoreContext = createContext(null);

export const UserStoreProvider = ({ children }) => {
    const storeRef = useRef(null);

    if (!storeRef.current) {
        storeRef.current = createUserStore();
    }

    useEffect(() => {
        // Hydrate safely on the client
        if (storeRef.current?.persist?.rehydrate) {
            storeRef.current.persist.rehydrate();
        }
    }, []);

    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {children}
        </UserStoreContext.Provider>
    );
};

export default function useUserStore(selector) {
    const store = useContext(UserStoreContext);
    if (!store) {
        throw new Error("useUserStore must be used within UserStoreProvider");
    }
    return useStore(store, selector || ((state) => state));
}