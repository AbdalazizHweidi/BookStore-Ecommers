import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBookById } from "../data/books";
import type { CartItem } from "../utils/pricing";

export const MAX_QUANTITY_PER_BOOK = 10;

type CartState = {
  items: CartItem[];
  addToCart: (bookId: string) => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
};

function addCopy(items: CartItem[], bookId: string): CartItem[] {
  if (!getBookById(bookId)) return items;
  const current = items.find((item) => item.bookId === bookId);
  if (!current) return [...items, { bookId, quantity: 1 }];
  return items.map((item) => item.bookId === bookId
    ? { ...item, quantity: Math.min(MAX_QUANTITY_PER_BOOK, item.quantity + 1) }
    : item);
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (id) => set((state) => ({ items: addCopy(state.items, id) })),
      increaseQuantity: (id) => set((state) => ({ items: addCopy(state.items, id) })),
      decreaseQuantity: (id) => set((state) => ({ items: state.items.map((item) =>
        item.bookId === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item) })),
      removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.bookId !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "leaflet-cart", partialize: (state) => ({ items: state.items }) },
  ),
);
