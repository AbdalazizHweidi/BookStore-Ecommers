import { getBookById } from "../data/books";
import type { CartLine, OrderTotals } from "../types/order";

export interface CartItem {
  bookId: string;
  quantity: number;
}
export const FLAT_SHIPPING_FEE = 4.99;
export const FREE_SHIPPING_THRESHOLD = 35;

const cents = (value: number) => Math.round((value + Number.EPSILON) * 100);
const dollars = (value: number) => value / 100;

export function buildCartLines(items: CartItem[]): CartLine[] {
  return items.flatMap(({ bookId, quantity }) => {
    const book = getBookById(bookId);
    if (!book || !Number.isInteger(quantity) || quantity <= 0) return [];
    return [{ book, quantity, lineTotal: dollars(cents(book.price) * quantity) }];
  });
}

export function calculateTotals(lines: CartLine[]): OrderTotals {
  const subtotalCents = lines.reduce((sum, { lineTotal }) => sum + cents(lineTotal), 0);
  const shippingCents = subtotalCents === 0 || subtotalCents >= cents(FREE_SHIPPING_THRESHOLD)
    ? 0 : cents(FLAT_SHIPPING_FEE);
  return {
    subtotal: dollars(subtotalCents),
    shipping: dollars(shippingCents),
    total: dollars(subtotalCents + shippingCents),
  };
}
