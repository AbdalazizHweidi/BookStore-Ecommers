import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  bookIds: string[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  toggleWishlist: (bookId: string) => void;
}

// Saved in localStorage under "leaflet-wishlist". No account needed.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      bookIds: [],
      addToWishlist: (bookId) =>
        set((state) =>
          // The check below is what prevents duplicate wishlist entries.
          state.bookIds.includes(bookId) ? state : { bookIds: [...state.bookIds, bookId] },
        ),
      removeFromWishlist: (bookId) =>
        set((state) => ({ bookIds: state.bookIds.filter((id) => id !== bookId) })),
      toggleWishlist: (bookId) => {
        if (get().bookIds.includes(bookId)) get().removeFromWishlist(bookId);
        else get().addToWishlist(bookId);
      },
    }),
    { name: "leaflet-wishlist" },
  ),
);
