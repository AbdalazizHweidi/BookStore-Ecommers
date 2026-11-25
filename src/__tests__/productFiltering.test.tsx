import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { books } from "../data/books";
import BooksPage from "../pages/BooksPage";
import { renderWithRouter, resetStores } from "../test/testUtils";
import { defaultFilters, filterBooks } from "../utils/filterBooks";

// ---------- TEST 1: Product filtering (PDF page 6) ----------

describe("filterBooks (the filtering logic)", () => {
  it("finds a book by title, ignoring capital letters", () => {
    const result = filterBooks(books, { ...defaultFilters, searchText: "ORCHARD" });
    expect(result.map((book) => book.id)).toEqual(["salt-orchard"]);
  });

  it("also finds a book by author name", () => {
    const result = filterBooks(books, { ...defaultFilters, searchText: "hannah" });
    expect(result.map((book) => book.id)).toEqual(["slow-mornings"]);
  });

  it("filters by category", () => {
    const result = filterBooks(books, { ...defaultFilters, category: "Fantasy" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((book) => book.category === "Fantasy")).toBe(true);
  });

  it("filters by price range", () => {
    const cheap = filterBooks(books, { ...defaultFilters, priceRange: "under-15" });
    expect(cheap.length).toBeGreaterThan(0);
    expect(cheap.every((book) => book.price < 15)).toBe(true);

    const expensive = filterBooks(books, { ...defaultFilters, priceRange: "over-20" });
    expect(expensive.length).toBeGreaterThan(0);
    expect(expensive.every((book) => book.price > 20)).toBe(true);
  });

  it("sorts by price without changing the original list", () => {
    const originalOrder = books.map((book) => book.id);

    const lowToHigh = filterBooks(books, { ...defaultFilters, sortBy: "price-low-high" }).map((b) => b.price);
    expect(lowToHigh).toEqual([...lowToHigh].sort((a, b) => a - b));

    const highToLow = filterBooks(books, { ...defaultFilters, sortBy: "price-high-low" }).map((b) => b.price);
    expect(highToLow).toEqual([...highToLow].sort((a, b) => b - a));

    expect(books.map((book) => book.id)).toEqual(originalOrder);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterBooks(books, { ...defaultFilters, searchText: "zzzz" })).toEqual([]);
  });
});

describe("Books page (what the visitor sees)", () => {
  beforeEach(resetStores);

  it("shows only the matching books after typing in the search box", async () => {
    const user = userEvent.setup();
    renderWithRouter(<BooksPage />, "/books");

    await user.type(screen.getByLabelText("Search books"), "orchard");

    expect(screen.getByRole("heading", { name: "The Salt Orchard" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Nine Hours to Midnight" })).not.toBeInTheDocument();
    expect(screen.getByText(`Showing 1 of ${books.length} books`)).toBeInTheDocument();
  });

  it("shows a message when no books match", async () => {
    const user = userEvent.setup();
    renderWithRouter(<BooksPage />, "/books");

    await user.type(screen.getByLabelText("Search books"), "zzzz");

    expect(screen.getByRole("heading", { name: /no books match/i })).toBeInTheDocument();
  });

  it("filters by category when a category button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<BooksPage />, "/books");

    await user.click(screen.getByRole("button", { name: "Fantasy" }));

    expect(screen.getByRole("heading", { name: "The Salt Orchard" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Nine Hours to Midnight" })).not.toBeInTheDocument();
  });
});
