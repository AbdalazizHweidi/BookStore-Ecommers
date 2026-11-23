import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { books } from "../data/books";
import { categoryNames } from "../data/categories";
import { useBookFilters } from "../hooks/useBookFilters";
import type { Category } from "../types/book";
import { priceRangeLabels, type PriceRange, type SortOption } from "../utils/filterBooks";

export default function BooksPage() {
  // The footer and the home page tiles link here with ?category=Fantasy (for example).
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = categoryNames.find((name) => name === searchParams.get("category")) ?? "All";

  const {
    filters,
    visibleBooks,
    hasActiveFilters,
    setSearchText,
    setCategory,
    setPriceRange,
    setSortBy,
    resetFilters,
  } = useBookFilters(categoryFromUrl);

  // If the URL changes while we are already on this page, follow it.
  useEffect(() => {
    setCategory(categoryFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  function pickCategory(category: Category | "All") {
    setCategory(category);
    setSearchParams(category === "All" ? {} : { category });
  }

  function clearFilters() {
    resetFilters();
    setSearchParams({});
  }

  return (
    <>
      <PageHeader title="Shop Books" crumbs={[{ label: "Home", to: "/" }, { label: "Books" }]} />

      <div className="container-fluid pb-5">
        <div className="container">
          {/* Search, price and sort */}
          <form className="row g-3 mb-4" role="search" onSubmit={(event) => event.preventDefault()}>
            <div className="col-lg-5">
              <label htmlFor="book-search" className="visually-hidden">
                Search books
              </label>
              <input
                id="book-search"
                type="search"
                className="form-control"
                placeholder="Search by title or author"
                value={filters.searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
            <div className="col-6 col-lg-3">
              <label htmlFor="price-range" className="visually-hidden">
                Price range
              </label>
              <select
                id="price-range"
                className="form-select"
                value={filters.priceRange}
                onChange={(event) => setPriceRange(event.target.value as PriceRange)}
              >
                {(Object.keys(priceRangeLabels) as PriceRange[]).map((range) => (
                  <option key={range} value={range}>
                    {priceRangeLabels[range]}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6 col-lg-4">
              <label htmlFor="sort-by" className="visually-hidden">
                Sort by
              </label>
              <select
                id="sort-by"
                className="form-select"
                value={filters.sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
              >
                <option value="default">Sort: Featured order</option>
                <option value="price-low-high">Price: low to high</option>
                <option value="price-high-low">Price: high to low</option>
              </select>
            </div>
          </form>

          {/* Category pills */}
          <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter by category">
            {(["All", ...categoryNames] as (Category | "All")[]).map((name) => (
              <button
                key={name}
                type="button"
                className={"btn btn-sm rounded-pill px-3 " + (filters.category === name ? "btn-primary" : "btn-outline-primary")}
                aria-pressed={filters.category === name}
                onClick={() => pickCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0" aria-live="polite">
              Showing {visibleBooks.length} of {books.length} books
            </p>
            {hasActiveFilters && (
              <button type="button" className="btn btn-link p-0" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>

          {visibleBooks.length > 0 ? (
            <div className="row g-4">
              {visibleBooks.map((book) => (
                <div key={book.id} className="col-6 col-md-4 col-lg-3">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="fa-search"
              title="No books match your filters"
              message="No books match what you picked. Try a different word, or clear the filters to see every book."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </div>
    </>
  );
}
