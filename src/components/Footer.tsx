import { Link } from "react-router-dom";
import { categories } from "../../../src/data/categories";

export default function Footer() {
  return (
    <footer className="container-fluid bg-white footer">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-6 col-lg-3">
            <Link to="/" className="d-inline-block mb-3">
              <span className="h1 text-primary">
                <i className="fa fa-book-open me-2" aria-hidden="true"></i>Leaflet
              </span>
            </Link>
            <p className="mb-0">
              A small online bookstore for people who always have one more book on the nightstand.
              Fiction, mystery, fantasy, science fiction, non-fiction and children's books.
            </p>
          </div>

          <div className="col-md-6 col-lg-3">
            <h2 className="h5 mb-4">Get in touch</h2>
            <p>
              <i className="fa fa-map-marker-alt me-3" aria-hidden="true"></i>Beirut, Lebanon
            </p>
            <p>
              <i className="fa fa-phone-alt me-3" aria-hidden="true"></i>+961 79 306 765
            </p>
            <p>
              <i className="fa fa-envelope me-3" aria-hidden="true"></i>nur4mnsr@gmail.com
            </p>
          </div>

          <div className="col-md-6 col-lg-3">
            <h2 className="h5 mb-4">Shop by category</h2>
            {categories.map((category) => (
              <Link
                key={category.name}
                className="btn btn-link"
                to={`/books?category=${encodeURIComponent(category.name)}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="col-md-6 col-lg-3">
            <h2 className="h5 mb-4">Quick links</h2>
            <Link className="btn btn-link" to="/">Home</Link>
            <Link className="btn btn-link" to="/books">All books</Link>
            <Link className="btn btn-link" to="/wishlist">Wishlist</Link>
            <Link className="btn btn-link" to="/cart">Cart</Link>
            <Link className="btn btn-link" to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-7 text-center text-md-start mb-3 mb-md-0">
              &copy; Leaflet Books. This is a student demo store: no real orders or payments.
            </div>
            <div className="col-md-5 text-center text-md-end">
              {/* The Hairnic template license requires this credit link to stay. */}
              Layout adapted from the Hairnic template by{" "}
              <a className="border-bottom" href="https://htmlcodex.com">
                HTML Codex
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
