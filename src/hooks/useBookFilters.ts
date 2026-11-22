import { useCallback, useMemo, useState } from "react";
import { books } from "../data/books";
import type { Category } from "../types/book";
import { defaultFilters, filterBooks, type BookFilters, type PriceRange, type SortOption } from "../utils/filterBooks";

export function useBookFilters(initialCategory: Category | "All" = "All") {
  const [filters, setFilters] = useState<BookFilters>({ ...defaultFilters, category: initialCategory });
  const visibleBooks = useMemo(() => filterBooks(books, filters), [filters]);
  const hasActiveFilters = Object.entries(defaultFilters).some(([key, value]) =>
    filters[key as keyof BookFilters] !== value);
  const setSearchText = useCallback((searchText: string) => setFilters((old) => ({ ...old, searchText })), []);
  const setCategory = useCallback((category: Category | "All") => setFilters((old) =>
    old.category === category ? old : { ...old, category }), []);
  const setPriceRange = useCallback((priceRange: PriceRange) => setFilters((old) => ({ ...old, priceRange })), []);
  const setSortBy = useCallback((sortBy: SortOption) => setFilters((old) => ({ ...old, sortBy })), []);
  const resetFilters = useCallback(() => setFilters({ ...defaultFilters }), []);
  return { filters, visibleBooks, hasActiveFilters,
    setSearchText, setCategory, setPriceRange, setSortBy, resetFilters };
}
