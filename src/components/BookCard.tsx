import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { Book } from "../types/book";
import { formatPrice } from "../utils/formatPrice";
import StarRating from "./StarRating";

interface BookCardProps {
  book: Book;
  // "shop" shows a heart toggle. "wishlist" shows a Remove button instead.
  variant?: "shop" | "wishlist";
}

export default function BookCard({ book, variant = "shop" }: BookCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isInWishlist = useWishlistStore((state) => state.bookIds.includes(book.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  const isOnSale = book.originalPrice !== undefined;

  return (
    <article className="book-card product-item text-center border h-100 p-3 d-flex flex-column">
      <div className="book-cover-wrap position-relative mx-auto mb-3">
        <img
          className="book-cover"
          src={book.cover}
          alt={`${book.title} by ${book.author}, book cover`}
          width={600}
          height={900}
          loading="lazy"
        />
        {isOnSale && <span className="badge book-sale-badge">Sale</span>}
      </div>

      <StarRating rating={book.rating} reviewCount={book.reviewCount} />

      {/* Long titles are cut after two lines; the full title is in the tooltip and the cover. */}
      <h3 className="book-title h6" title={book.title}>
        {book.title}
      </h3>
      <p className="book-author mb-1">by {book.author}</p>
      <p className="book-category mb-3">{book.category}</p>

      <div className="mt-auto">
        <p className="book-price h5 text-primary mb-3">
          {formatPrice(book.price)}
          {isOnSale && (
            <del className="ms-2 small text-secondary">
              <span className="visually-hidden">Original price </span>
              {formatPrice(book.originalPrice!)}
            </del>
          )}
        </p>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-primary flex-grow-1 px-2" onClick={() => addToCart(book.id)}>
            Add to Cart<span className="visually-hidden">: {book.title}</span>
          </button>

          {variant === "shop" ? (
            <button
              type="button"
              className={"btn btn-square wishlist-btn " + (isInWishlist ? "btn-primary" : "btn-outline-primary")}
              aria-pressed={isInWishlist}
              aria-label={isInWishlist ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
              onClick={() => toggleWishlist(book.id)}
            >
              <i className={(isInWishlist ? "fas" : "far") + " fa-heart"} aria-hidden="true"></i>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-square btn-outline-primary wishlist-btn"
              aria-label={`Remove ${book.title} from wishlist`}
              onClick={() => removeFromWishlist(book.id)}
            >
              <i className="far fa-trash-alt" aria-hidden="true"></i>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
