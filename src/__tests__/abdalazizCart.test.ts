import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore, MAX_QUANTITY_PER_BOOK } from "../store/cartStore";
import { buildCartLines, calculateTotals } from "../utils/pricing";

beforeEach(() => { useCartStore.getState().clearCart(); localStorage.clear(); });

describe("Abdalaziz / cart", () => {
  it("adds books and merges quantities", () => {
    const { addToCart } = useCartStore.getState();
    addToCart("nine-hours"); addToCart("nine-hours");
    expect(useCartStore.getState().items).toEqual([{ bookId: "nine-hours", quantity: 2 }]);
  });
  it("caps quantity and removes an item", () => {
    const { addToCart, removeFromCart } = useCartStore.getState();
    for (let i = 0; i < 20; i++) addToCart("nine-hours");
    expect(useCartStore.getState().items[0].quantity).toBe(MAX_QUANTITY_PER_BOOK);
    removeFromCart("nine-hours");
    expect(useCartStore.getState().items).toEqual([]);
  });
  it("uses $4.99 shipping below $35 and free shipping at $35", () => {
    expect(calculateTotals(buildCartLines([{ bookId: "nine-hours", quantity: 1 }])).total).toBe(20.98);
    expect(calculateTotals(buildCartLines([{ bookId: "salt-orchard", quantity: 2 }])).shipping).toBe(0);
  });
  it("persists book IDs and quantities", () => {
    useCartStore.getState().addToCart("salt-orchard");
    expect(JSON.parse(localStorage.getItem("leaflet-cart")!).state.items)
      .toEqual([{ bookId: "salt-orchard", quantity: 1 }]);
  });
  it("ignores unknown book IDs", () => {
    useCartStore.getState().addToCart("unknown-book-id");
    expect(useCartStore.getState().items).toEqual([]);
  });
});
