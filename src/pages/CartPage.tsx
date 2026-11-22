import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { useCartSummary } from "../hooks/useCartSummary";
import { MAX_QUANTITY_PER_BOOK, useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD } from "../utils/pricing";

export default function CartPage() {
  const { lines, itemCount, subtotal, shipping, total } = useCartSummary();
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const remove = useCartStore((s) => s.removeFromCart);
  const clear = useCartStore((s) => s.clearCart);
  const breadcrumbs = [{ label: "Home", to: "/" }, { label: "Cart" }];

  if (!lines.length) return (
    <><PageHeader title="Your Cart" crumbs={breadcrumbs} />
      <div className="container pb-5"><EmptyState icon="fa-shopping-cart" title="Your cart is empty"
        message="Choose a book to start your next reading adventure."
        actionLabel="Continue Shopping" actionTo="/books" /></div></>
  );

  return (
    <><PageHeader title="Your Cart" crumbs={breadcrumbs} />
      <div className="container-fluid pb-5"><div className="container"><div className="row g-5">
        <section className="col-lg-8" aria-label="Items in your cart">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">{itemCount} {itemCount === 1 ? "book" : "books"} in your cart</p>
            <button type="button" className="btn btn-link" onClick={clear}>Clear Cart</button>
          </div>
          {lines.map(({ book, quantity, lineTotal }) => (
            <article key={book.id} className="cart-row border p-3 mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-4 col-md-2"><img className="book-cover" src={book.cover}
                  alt={`${book.title} by ${book.author}, book cover`} width={600} height={900} /></div>
                <div className="col-8 col-md-4">
                  <h2 className="h6 mb-1">{book.title}</h2><p className="book-author mb-1">by {book.author}</p>
                  <strong className="text-primary">{formatPrice(book.price)}</strong>
                </div>
                <div className="col-6 col-md-3"><div className="qty-stepper d-inline-flex align-items-center border">
                  <button type="button" className="btn btn-link" disabled={quantity <= 1}
                    aria-label={`Decrease quantity of ${book.title}`} onClick={() => decrease(book.id)}>−</button>
                  <span className="qty-stepper__value" aria-live="polite">{quantity}</span>
                  <button type="button" className="btn btn-link" disabled={quantity >= MAX_QUANTITY_PER_BOOK}
                    aria-label={`Increase quantity of ${book.title}`} onClick={() => increase(book.id)}>+</button>
                </div></div>
                <div className="col-6 col-md-3 text-end">
                  <p className="h5">{formatPrice(lineTotal)}</p>
                  <button type="button" className="btn btn-link p-0"
                    aria-label={`Remove ${book.title} from cart`} onClick={() => remove(book.id)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </section>
        <aside className="col-lg-4"><div className="cart-summary border p-4 bg-white">
          <h2 className="h5 mb-4">Cart total</h2>
          <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="d-flex justify-content-between mt-2"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <hr /><div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
          {subtotal < FREE_SHIPPING_THRESHOLD && <p className="small mt-3">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
          </p>}
          <Link className="btn btn-primary w-100 mt-4 py-2" to="/checkout">Proceed to Checkout</Link>
          <Link className="btn btn-outline-primary w-100 mt-2 py-2" to="/books">Continue Shopping</Link>
        </div></aside>
      </div></div></div>
    </>
  );
}
