import { Link } from "react-router-dom";
import { getBookById, heroBookId, heroSecondBookId } from "../../../../src/data/books";
import { useWishlistStore } from "../../../../src/store/wishlistStore";

// Hairnic hero (headline + two buttons + two bottles) -> featured book with two covers.
export default function HeroSection() {
  const book = getBookById(heroBookId)!;
  const secondBook = getBookById(heroSecondBookId)!;
  const isSaved = useWishlistStore((state) => state.bookIds.includes(book.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  return (
    <div className="container-fluid bg-primary hero-header mb-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 text-center text-lg-start">
            <h3 className="fw-light text-white">New this month in Fantasy</h3>
            <h1 className="display-4 text-white">
              Get lost in <span className="fw-light text-dark">{book.title}</span>
            </h1>
            <p className="hero-author text-white mb-2">by {book.author}</p>
            <p className="text-white mb-4 hero-hook">{book.hook}</p>
            <Link to="/books" className="btn btn-dark py-2 px-4 me-3">
              Shop Books
            </Link>
            <button
              type="button"
              className="btn btn-outline-dark py-2 px-4 mt-3 mt-sm-0"
              aria-pressed={isSaved}
              onClick={() => toggleWishlist(book.id)}
            >
              {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
          </div>

          <div className="col-lg-6">
            <div className="hero-covers">
              <img
                className="book-cover hero-cover hero-cover--back"
                src={secondBook.cover}
                alt={`${secondBook.title} by ${secondBook.author}, book cover`}
                width={600}
                height={900}
              />
              <img
                className="book-cover hero-cover hero-cover--front"
                src={book.cover}
                alt={`${book.title} by ${book.author}, book cover`}
                width={600}
                height={900}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
