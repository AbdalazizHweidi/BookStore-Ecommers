import type { CartLine } from "../types/order";
import { formatPrice } from "../utils/formatPrice";

interface TotalsRowsProps {
  subtotal: number;
  shipping: number;
  total: number;
}

// The three money lines shared by the cart, checkout and confirmation screens.
export function TotalsRows({ subtotal, shipping, total }: TotalsRowsProps) {
  return (
    <dl className="totals-rows mb-0">
      <div className="d-flex justify-content-between mb-2">
        <dt className="fw-normal">Subtotal</dt>
        <dd className="mb-0">{formatPrice(subtotal)}</dd>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <dt className="fw-normal">Shipping</dt>
        <dd className="mb-0">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="d-flex justify-content-between pt-3 border-top">
        <dt className="h5 mb-0">Total</dt>
        <dd className="h5 text-primary mb-0">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

interface OrderSummaryProps extends TotalsRowsProps {
  lines: CartLine[];
}

export default function OrderSummary({ lines, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div className="order-summary border p-4 bg-white">
      <h2 className="h5 mb-4">Order summary</h2>
      <ul className="list-unstyled mb-4">
        {lines.map((line) => (
          <li key={line.book.id} className="d-flex align-items-center gap-3 mb-3">
            <img
              className="book-cover book-cover--thumb"
              src={line.book.cover}
              alt=""
              width={600}
              height={900}
            />
            <div className="flex-grow-1">
              <div className="book-line-title">{line.book.title}</div>
              <small className="text-secondary">
                {line.quantity} &times; {formatPrice(line.book.price)}
              </small>
            </div>
            <span className="fw-bold">{formatPrice(line.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <TotalsRows subtotal={subtotal} shipping={shipping} total={total} />
    </div>
  );
}
