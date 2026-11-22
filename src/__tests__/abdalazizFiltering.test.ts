import { describe, expect, it } from "vitest";
import { books } from "../data/books";
import { defaultFilters, filterBooks } from "../utils/filterBooks";

describe("Abdalaziz / book discovery", () => {
  it("finds a title regardless of case", () => {
    expect(filterBooks(books, { ...defaultFilters, searchText: "ORCHARD" }).map((b) => b.id))
      .toEqual(["salt-orchard"]);
  });
  it("matches authors and combines category and price", () => {
    expect(filterBooks(books, { ...defaultFilters, searchText: "hannah" })[0]?.id).toBe("slow-mornings");
    expect(filterBooks(books, { ...defaultFilters, category: "Fantasy", priceRange: "under-15" })).toEqual([]);
  });
  it("returns an empty list for nonsense search", () => {
    expect(filterBooks(books, { ...defaultFilters, searchText: "zzzz" })).toEqual([]);
  });
  it("sorts without modifying the catalog", () => {
    const ids = books.map((b) => b.id);
    const ascending = filterBooks(books, { ...defaultFilters, sortBy: "price-low-high" });
    expect(ascending.map((b) => b.price)).toEqual([...ascending].map((b) => b.price).sort((a,b) => a-b));
    expect(books.map((b) => b.id)).toEqual(ids);
  });
});
