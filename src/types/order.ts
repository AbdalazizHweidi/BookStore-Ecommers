
import type { Book } from "./book";
import type { CheckoutFormValues } from "../schemas/checkoutSchema";
export interface CartLine {
  book: Book;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
export interface CompletedOrder extends OrderTotals {
  reference: string;
  placedAt: string; // ISO date string
  customer: CheckoutFormValues;
  lines: CartLine[];
}
