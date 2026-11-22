import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { renderWithRouter, resetStores } from "../test/testUtils";

describe("Home page", () => {
  beforeEach(resetStores);

  it("uses the same cart and wishlist as the navigation", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />);

    expect(screen.getByRole("heading", { name: /A small shop for big reading lives/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Deal of the Week" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How it works:/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Save to Wishlist" }));
    await user.click(screen.getByRole("button", { name: "Add The Last Lighthouse Keeper to wishlist" }));
    expect(screen.getByRole("link", { name: "Wishlist, 2 items" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Add to Cart\s*: Crown of Ash and Thistle/ }));
    expect(screen.getByRole("link", { name: "Cart, 1 item" })).toBeInTheDocument();
  });
});
