
import type { Book } from "./book";

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
