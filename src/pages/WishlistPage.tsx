import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { getBookById } from "../data/books";
import { useWishlistStore } from "../store/wishlistStore";
import type { Book } from "../types/book";

export default function WishlistPage() {
  const bookIds = useWishlistStore((state) => state.bookIds);
  const savedBooks = bookIds.map(getBookById).filter((book): book is Book => book !== undefined);

  return (
    <>
      <PageHeader title="Your Wishlist" crumbs={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
      <div className="container-fluid pb-5">
        <div className="container">
          {savedBooks.length === 0 ? (
            <EmptyState
              icon="fa-heart"
              title="Your wishlist is empty"
              message="Tap the heart on any book to save it here. No account needed."
              actionLabel="Browse Books"
              actionTo="/books"
            />
          ) : (
            <>
              <p className="mb-4">
                {savedBooks.length} saved {savedBooks.length === 1 ? "book" : "books"}
              </p>
              <div className="row g-4">
                {savedBooks.map((book) => (
                  <div key={book.id} className="col-6 col-md-4 col-lg-3">
                    <BookCard book={book} variant="wishlist" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
