import type { Book, Category } from "../types/book";

export type PriceRange = "all" | "under-15" | "15-20" | "over-20";
export type SortOption = "default" | "price-low-high" | "price-high-low";
export interface BookFilters {
  searchText: string;
  category: Category | "All";
  priceRange: PriceRange;
  sortBy: SortOption;
}
export const defaultFilters: BookFilters = {
  searchText: "", category: "All", priceRange: "all", sortBy: "default",
};
export const priceRangeLabels: Record<PriceRange, string> = {
  all: "Any price", "under-15": "Under $15", "15-20": "$15 to $20", "over-20": "Over $20",
};

export function filterBooks(catalog: Book[], choices: BookFilters): Book[] {
  const query = choices.searchText.trim().toLocaleLowerCase();
  const filtered = catalog.filter((book) => {
    if (query && !`${book.title} ${book.author}`.toLocaleLowerCase().includes(query)) return false;
    if (choices.category !== "All" && book.category !== choices.category) return false;
    if (choices.priceRange === "under-15" && book.price >= 15) return false;
    if (choices.priceRange === "15-20" && (book.price < 15 || book.price > 20)) return false;
    if (choices.priceRange === "over-20" && book.price <= 20) return false;
    return true;
  });
  const direction = choices.sortBy === "price-low-high" ? 1 : choices.sortBy === "price-high-low" ? -1 : 0;
  return direction ? filtered.sort((a, b) => direction * (a.price - b.price)) : filtered;
}
