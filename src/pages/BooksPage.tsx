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
  const [params, setParams] = useSearchParams();
  const requestedCategory = categoryNames.find((name) => name === params.get("category")) ?? "All";
  const { filters, visibleBooks, hasActiveFilters, setSearchText, setCategory, setPriceRange,
    setSortBy, resetFilters } = useBookFilters(requestedCategory);

  useEffect(() => { setCategory(requestedCategory); }, [requestedCategory, setCategory]);
  const selectCategory = (category: Category | "All") => {
    setCategory(category);
    setParams(category === "All" ? {} : { category });
  };
  const clear = () => { resetFilters(); setParams({}); };

  return (
    <>
      <PageHeader title="Shop Books" crumbs={[{ label: "Home", to: "/" }, { label: "Books" }]} />
      <div className="container-fluid pb-5"><div className="container">
        <form role="search" className="row g-3 mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-lg-5">
            <label htmlFor="book-search" className="visually-hidden">Search books</label>
            <input id="book-search" type="search" className="form-control" placeholder="Search by title or author"
              value={filters.searchText} onChange={(event) => setSearchText(event.target.value)} />
          </div>
          <div className="col-6 col-lg-3">
            <label htmlFor="price-range" className="visually-hidden">Price range</label>
            <select id="price-range" className="form-select" value={filters.priceRange}
              onChange={(event) => setPriceRange(event.target.value as PriceRange)}>
              {(Object.keys(priceRangeLabels) as PriceRange[]).map((range) => (
                <option key={range} value={range}>{priceRangeLabels[range]}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-lg-4">
            <label htmlFor="sort-by" className="visually-hidden">Sort by</label>
            <select id="sort-by" className="form-select" value={filters.sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}>
              <option value="default">Sort: Featured order</option>
              <option value="price-low-high">Price: low to high</option>
              <option value="price-high-low">Price: high to low</option>
            </select>
          </div>
        </form>
        <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter by category">
          {(["All", ...categoryNames] as (Category | "All")[]).map((category) => (
            <button key={category} type="button" className={`btn btn-sm rounded-pill px-3 ${filters.category === category ? "btn-primary" : "btn-outline-primary"}`}
              aria-pressed={filters.category === category} onClick={() => selectCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="mb-0" aria-live="polite">Showing {visibleBooks.length} of {books.length} books</p>
          {hasActiveFilters && <button type="button" className="btn btn-link p-0" onClick={clear}>Clear filters</button>}
        </div>
        {visibleBooks.length ? (
          <div className="row g-4">{visibleBooks.map((book) => (
            <div className="col-6 col-md-4 col-lg-3" key={book.id}><BookCard book={book} /></div>
          ))}</div>
        ) : (
          <EmptyState icon="fa-search" title="No books match your filters"
            message="Try another search or price range." actionLabel="Clear Filters" onAction={clear} />
        )}
      </div></div>
    </>
  );
}
