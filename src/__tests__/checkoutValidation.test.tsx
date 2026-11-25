import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import CheckoutPage from "../pages/CheckoutPage";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { renderWithRouter, resetStores } from "../test/testUtils";

// ---------- TEST 3: Checkout validation (PDF page 6) ----------

describe("Checkout form", () => {
  beforeEach(() => {
    resetStores();
    useCartStore.setState({ items: [{ bookId: "salt-orchard", quantity: 1 }] });
  });

  it("shows an error next to every required field when the form is empty, and does not submit", async () => {
    const user = userEvent.setup();
    renderWithRouter(<CheckoutPage />, "/checkout");

    await user.click(screen.getByRole("button", { name: "Place Order" }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter your phone number.")).toBeInTheDocument();
    expect(screen.getByText("Enter your street address.")).toBeInTheDocument();
    expect(screen.getByText("Enter your city.")).toBeInTheDocument();
    expect(screen.getByText("Enter your postal code.")).toBeInTheDocument();
    expect(screen.getByText("Choose your country.")).toBeInTheDocument();

    // The form was not submitted: still on the form, and the cart is untouched.
    expect(screen.getByRole("button", { name: "Place Order" })).toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("shows a specific message for an invalid email", async () => {
    const user = userEvent.setup();
    renderWithRouter(<CheckoutPage />, "/checkout");

    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Place Order" }));

    expect(screen.getByText("Enter a valid email address, like name@example.com.")).toBeInTheDocument();
  });

  it("with valid details: shows the confirmation, clears the cart and keeps the wishlist", async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ bookIds: ["pip-paper-boat"] });
    renderWithRouter(<CheckoutPage />, "/checkout");

    await user.type(screen.getByLabelText("Full name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Phone number"), "+1 555 010 2030");
    await user.type(screen.getByLabelText("Street address"), "12 Analytical Way");
    await user.type(screen.getByLabelText("City"), "London");
    await user.type(screen.getByLabelText("Postal code"), "N1 9GU");
    await user.selectOptions(screen.getByLabelText("Country"), "United Kingdom");
    await user.click(screen.getByRole("button", { name: "Place Order" }));

    expect(screen.getByRole("heading", { name: "Thank you, Ada!" })).toBeInTheDocument();
    expect(screen.getByText(/^LF-\d{8}-[A-Z0-9]{6}$/)).toBeInTheDocument(); // order reference
    expect(screen.getByText("The Salt Orchard")).toBeInTheDocument(); // order summary
    expect(useCartStore.getState().items).toEqual([]);
    expect(useWishlistStore.getState().bookIds).toEqual(["pip-paper-boat"]);
  });

  it("does not allow checkout when the cart is empty", () => {
    useCartStore.setState({ items: [] });
    renderWithRouter(<CheckoutPage />, "/checkout");

    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Place Order" })).not.toBeInTheDocument();
  });
});
