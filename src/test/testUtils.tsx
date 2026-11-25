import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

// Renders a component inside a router (our pages need one for <Link> and useSearchParams).
export function renderWithRouter(ui: ReactElement, route = "/") {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

// Puts the cart and wishlist back to empty so one test cannot affect the next.
export function resetStores() {
  localStorage.clear();
  useCartStore.setState({ items: [] });
  useWishlistStore.setState({ bookIds: [] });
}
