
import { useCartStore } from "../store/cartStore";
import type { Book } from "../types/book";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  book: Book;
  variant?: "shop" | "wishlist";
  inWishlist?: boolean;
  onToggleWishlist?: (bookId: string) => void;
  onRemoveWishlist?: (bookId: string) => void;
};

export default function BookCard({
  book,
  variant = "shop",
  inWishlist = false,
  onToggleWishlist,
  onRemoveWishlist,
}: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

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
        {book.originalPrice !== undefined && (
          <span className="badge book-sale-badge">Sale</span>
        )}
      </div>

      <p className="small text-secondary mb-2">
        ★ {book.rating} ({book.reviewCount} reviews)
      </p>

      <h3 className="book-title h6" title={book.title}>
        {book.title}
      </h3>
      <p className="book-author mb-1">by {book.author}</p>
      <p className="book-category mb-3">{book.category}</p>

      <div className="mt-auto">
        <p className="book-price h5 text-primary mb-3">
          {formatPrice(book.price)}
          {book.originalPrice !== undefined && (
            <del className="ms-2 small text-secondary">
              {formatPrice(book.originalPrice)}
            </del>
          )}
        </p>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary flex-grow-1 px-2"
            aria-label={`Add to Cart: ${book.title}`}
            onClick={() => addToCart(book.id)}
          >
            Add to Cart
          </button>

          {variant === "shop" && onToggleWishlist && (
            <button
              type="button"
              className={`btn btn-square wishlist-btn ${
                inWishlist ? "btn-primary" : "btn-outline-primary"
              }`}
              aria-label={
                inWishlist
                  ? `Remove ${book.title} from wishlist`
                  : `Add ${book.title} to wishlist`
              }
              aria-pressed={inWishlist}
              onClick={() => onToggleWishlist(book.id)}
            >
              <i
                className={`${inWishlist ? "fas" : "far"} fa-heart`}
                aria-hidden="true"
              />
            </button>
          )}

          {variant === "wishlist" && onRemoveWishlist && (
            <button
              type="button"
              className="btn btn-square btn-outline-primary wishlist-btn"
              aria-label={`Remove ${book.title} from wishlist`}
              onClick={() => onRemoveWishlist(book.id)}
            >
              <i className="far fa-trash-alt" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
