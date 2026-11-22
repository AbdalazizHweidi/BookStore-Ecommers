# Leaflet Books

A responsive online bookstore built with **React + TypeScript** for the React E-Commerce group project.
The layout and styling are adapted from the free **Hairnic** HTML template by HTML Codex
(the credit link in the footer must stay, as the template license requires).

Everything runs in the browser. There is no backend, login or real payment.

## Teammates

- Nour Mansour | Abedelaziz Hweidi | Jenin Kiblawi

## Features

- **Home**: hero with a featured book, category tiles, about block, weekly deal with countdown, "Why readers love this book", how ordering works, featured books.
- **Books**: responsive grid; search by title or author; filter by category and price range; sort by price; "no results" message.
- **Cart**: change quantities, remove a book, clear the cart, subtotal / shipping / total, empty message, continue shopping, proceed to checkout. Saved in `localStorage`.
- **Wishlist**: add/remove books, no duplicates, add to cart, empty message. Saved in `localStorage`. No account needed.
- **Checkout**: Zod-validated delivery form with errors next to each field, blocked when the cart is empty, order confirmation with a reference number and summary, cart cleared and wishlist kept.
- Cart and wishlist counts in the header, mobile navigation, 404 page.

## Technologies

React 18, TypeScript, Vite, React Router, Zustand (state + localStorage), Zod (form validation), Vitest + React Testing Library (tests), Bootstrap CSS (from Hairnic).

## Run it

You need Node.js 18 or newer.

```bash
npm install
npm run dev      # open the address it prints, usually http://localhost:5173
npm test         # run the automated tests once
npm run build    # type-check and create a production build
```

## Folder structure

```
public/covers/      placeholder book covers (SVG)
src/
  components/       Navbar, Footer, BookCard, PageHeader, FormField, OrderSummary ...
    home/           one component per home page section
  pages/            HomePage, BooksPage, CartPage, WishlistPage, CheckoutPage, NotFoundPage
  data/             books.ts (sample books), categories.ts
  store/            cartStore.ts, wishlistStore.ts (Zustand)
  hooks/            useBookFilters, useCartSummary, useCheckoutForm, useCountdown, useScrolled
  utils/            filterBooks, pricing, formatPrice, orderReference
  schemas/          checkoutSchema.ts (Zod)
  types/            Book and order types
  styles/           bootstrap.min.css, template.css (from Hairnic), books.css (our changes)
  __tests__/        automated tests
```

## Tests

`npm test` runs: product filtering (required test 1), shopping cart (test 2), checkout validation (test 3),
plus wishlist, quantity and order-calculation tests.

## Team workflow

`main` is protected: work happens on feature branches created from `dev`, merged by pull request after a teammate's review, and `dev` is merged into `main` once everything is tested.

## Notes

- All books and authors are fictional. Replace a cover by putting an image in `public/covers/` and changing its `cover` path in `src/data/books.ts`.
- Shipping is a flat $4.99, free for orders of $35 or more. Maximum 10 copies of one book per order.
