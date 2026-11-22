import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import WishlistPage from "../pages/WishlistPage";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { renderWithRouter, resetStores } from "../test/testUtils";

describe("Wishlist", () => {
  beforeEach(resetStores);

  it("does not save the same book twice", () => {
    const { addToWishlist } = useWishlistStore.getState();
    addToWishlist("salt-orchard");
    addToWishlist("salt-orchard");
    expect(useWishlistStore.getState().bookIds).toEqual(["salt-orchard"]);
  });

  it("toggle adds a book and then removes it", () => {
    const { toggleWishlist } = useWishlistStore.getState();
    toggleWishlist("night-garden");
    expect(useWishlistStore.getState().bookIds).toEqual(["night-garden"]);
    toggleWishlist("night-garden");
    expect(useWishlistStore.getState().bookIds).toEqual([]);
  });

  it("is saved in localStorage so it survives a refresh", () => {
    useWishlistStore.getState().addToWishlist("moth-queen");
    const saved = JSON.parse(localStorage.getItem("leaflet-wishlist")!);
    expect(saved.state.bookIds).toEqual(["moth-queen"]);
  });

  it("shows an empty message when nothing is saved", () => {
    renderWithRouter(<WishlistPage />, "/wishlist");
    expect(screen.getByRole("heading", { name: "Your wishlist is empty" })).toBeInTheDocument();
  });

  it("lists saved books, lets you add one to the cart, and lets you remove one", async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ bookIds: ["pip-paper-boat", "night-garden"] });
    renderWithRouter(<WishlistPage />, "/wishlist");

    expect(screen.getByRole("heading", { name: "Pip and the Paper Boat" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Night Garden Counting Book" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to Cart: Pip and the Paper Boat" }));
    expect(useCartStore.getState().items).toEqual([{ bookId: "pip-paper-boat", quantity: 1 }]);

    await user.click(screen.getByRole("button", { name: "Remove Pip and the Paper Boat from wishlist" }));
    expect(useWishlistStore.getState().bookIds).toEqual(["night-garden"]);
    expect(screen.queryByRole("heading", { name: "Pip and the Paper Boat" })).not.toBeInTheDocument();
  });
});
