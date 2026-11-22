import { Link } from "react-router-dom";
import { aboutShelfBookIds, books, getBookById } from "../../data/books";

// Hairnic's "image left, text right" about block -> a fan of covers and the story of the shop.
export default function AboutSection() {
  const shelfBooks = aboutShelfBookIds.map((id) => getBookById(id)!);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="cover-fan">
              {shelfBooks.map((book, index) => (
                <img
                  key={book.id}
                  className={`book-cover cover-fan__item cover-fan__item--${index + 1}`}
                  src={book.cover}
                  alt={`${book.title} by ${book.author}, book cover`}
                  width={600}
                  height={900}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="h1 text-primary mb-4">
              A small shop for <span className="fw-light text-dark">big reading lives</span>
            </h2>
            <p className="mb-4">
              Leaflet started as one shelf in a corner café. Today we stock {books.length} carefully chosen titles
              across six categories, and every one of them has been read and recommended by someone on our team.
            </p>
            <p className="mb-4">
              We would rather help you find the right book than the most popular one. Browse a shelf, save the books
              you are curious about, and order when you are ready.
            </p>
            <Link className="btn btn-primary py-2 px-4" to="/books">
              Browse All Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
