import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartSummary } from "../../../src/hooks/useCartSummary";
import { useScrolled } from "../../../src/hooks/useScrolled";
import { useWishlistStore } from "../../../src/store/wishlistStore";

function itemsLabel(count: number): string {
  return `${count} ${count === 1 ? "item" : "items"}`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(300); // Hairnic's navbar turns solid after 300px of scrolling
  const location = useLocation();
  const { itemCount: cartCount } = useCartSummary();
  const wishlistCount = useWishlistStore((state) => state.bookIds.length);

  // Close the mobile menu whenever the visitor goes to another page.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function navLinkClass({ isActive }: { isActive: boolean }): string {
    return "nav-item nav-link" + (isActive ? " active" : "");
  }

  return (
    <div
      className={"container-fluid sticky-top" + (scrolled ? " bg-primary shadow-sm" : "")}
      style={{ top: scrolled ? 0 : -150 }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light p-0" aria-label="Main navigation">
          <Link to="/" className="navbar-brand">
            <span className="h2 text-white mb-0">
              <i className="fa fa-book-open me-2" aria-hidden="true"></i>Leaflet
            </span>
          </Link>

          <button
            type="button"
            className="navbar-toggler ms-auto me-0"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={"collapse navbar-collapse" + (menuOpen ? " show" : "")} id="main-menu">
            <div className="navbar-nav ms-auto align-items-lg-center">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/books" className={navLinkClass}>
                Books
              </NavLink>
              <NavLink
                to="/wishlist"
                className={navLinkClass}
                aria-label={`Wishlist, ${itemsLabel(wishlistCount)}`}
              >
                <i className="far fa-heart me-1" aria-hidden="true"></i>Wishlist
                <span className="badge rounded-pill bg-dark ms-2" aria-hidden="true">
                  {wishlistCount}
                </span>
              </NavLink>
              <Link
                to="/cart"
                className="btn btn-dark py-2 px-4 nav-cart"
                aria-label={`Cart, ${itemsLabel(cartCount)}`}
              >
                <i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>Cart
                <span className="badge rounded-pill bg-light text-dark ms-2" aria-hidden="true">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
