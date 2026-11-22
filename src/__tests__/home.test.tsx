import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WeeklyDealSection from "../components/home/WeeklyDealSection";
import HomePage from "../pages/HomePage";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { renderWithRouter, resetStores } from "../test/testUtils";

describe("Home page", () => {
  beforeEach(resetStores);

  it("renders the home sections and adds the weekly deal to the cart", async () => {
    const user = userEvent.setup();
    renderWithRouter(<HomePage />);

    expect(screen.getByRole("heading", { name: /a little about leaflet/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /why readers love/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ready for your next read/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));
    expect(useCartStore.getState().items).toEqual([{ bookId: "ash-thistle", quantity: 1 }]);
  });

  it("uses the same wishlist for the hero and featured books", async () => {
    const user = userEvent.setup();
    renderWithRouter(<HomePage />);

    await user.click(screen.getByRole("button", { name: "Save to Wishlist" }));
    await user.click(screen.getByRole("button", { name: "Add The Last Lighthouse Keeper to wishlist" }));
    expect(useWishlistStore.getState().bookIds).toEqual(["salt-orchard", "last-lighthouse-keeper"]);
    expect(screen.getByRole("button", { name: "Saved to Wishlist" })).toHaveAttribute("aria-pressed", "true");
  });

  it("starts a new weekly countdown after Sunday ends", () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date(2026, 10, 22, 23, 59, 58));
      renderWithRouter(<WeeklyDealSection />);
      act(() => vi.advanceTimersByTime(2000));
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByText(/Ends in 6d/)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
