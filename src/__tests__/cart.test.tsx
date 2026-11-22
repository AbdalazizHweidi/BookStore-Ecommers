import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Navbar from "../components/Navbar";
import BooksPage from "../pages/BooksPage";
import CartPage from "../pages/CartPage";
import { useCartStore } from "../store/cartStore";
import { renderWithRouter, resetStores } from "../test/testUtils";

// ---------- TEST 2: Shopping cart (PDF page 6) ----------

describe("Shopping cart", () => {
  beforeEach(resetStores);

  it("adding a book updates the cart and the cart count in the navbar", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <>
        <Navbar />
        <BooksPage />
      </>,
      "/books",
    );
    expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to Cart: The Salt Orchard" }));

    expect(screen.getByRole("link", { name: "Cart, 1 item" })).toBeInTheDocument();
    expect(useCartStore.getState().items).toEqual([{ bookId: "salt-orchard", quantity: 1 }]);
  });

  it("adding the same book twice raises the quantity instead of making a second row", async () => {
    const user = userEvent.setup();
    renderWithRouter(<BooksPage />, "/books");

    const addButton = screen.getByRole("button", { name: "Add to Cart: Nine Hours to Midnight" });
    await user.click(addButton);
    await user.click(addButton);

    expect(useCartStore.getState().items).toEqual([{ bookId: "nine-hours", quantity: 2 }]);
  });

  it("saves the cart in localStorage so it survives a refresh", async () => {
    useCartStore.getState().addToCart("pip-paper-boat");

    const saved = JSON.parse(localStorage.getItem("leaflet-cart")!);
    expect(saved.state.items).toEqual([{ bookId: "pip-paper-boat", quantity: 1 }]);
  });

  it("cart page: changes quantity, updates the total, removes a book and clears the cart", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [{ bookId: "nine-hours", quantity: 1 }] }); // $15.99
    renderWithRouter(<CartPage />, "/cart");

    // one copy: $15.99 + $4.99 shipping = $20.98
    expect(screen.getByText("$20.98")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease quantity of Nine Hours to Midnight" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Increase quantity of Nine Hours to Midnight" }));

    // two copies: $31.98 + $4.99 shipping = $36.97
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    expect(screen.getByText("$36.97")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove Nine Hours to Midnight from cart" }));
    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });

  it("cart page: Clear Cart removes every book", async () => {
    const user = userEvent.setup();
    useCartStore.setState({
      items: [
        { bookId: "nine-hours", quantity: 1 },
        { bookId: "salt-orchard", quantity: 2 },
      ],
    });
    renderWithRouter(<CartPage />, "/cart");

    await user.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(useCartStore.getState().items).toEqual([]);
    expect(screen.getByRole("link", { name: "Continue Shopping" })).toBeInTheDocument();
  });
});
