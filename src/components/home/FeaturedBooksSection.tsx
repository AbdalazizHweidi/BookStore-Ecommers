import { Link } from "react-router-dom";
import { featuredBookIds, getBookById } from "../../../../src/data/books";
import BookCard from "../../../../src/components/BookCard";
import SectionHeading from "../../../../src/components/SectionHeading";

// Hairnic's "Our Natural Hair Products" row of four cards -> four featured books.
export default function FeaturedBooksSection() {
  const featuredBooks = featuredBookIds.map((id) => getBookById(id)!);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <SectionHeading
          lead="Featured"
          main="Books"
          intro="Four titles our team keeps handing to friends."
        />
        <div className="row g-4">
          {featuredBooks.map((book) => (
            <div key={book.id} className="col-6 col-lg-3">
              <BookCard book={book} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link to="/books" className="btn btn-primary py-2 px-4">
            Browse All Books
          </Link>
        </div>
      </div>
    </div>
  );
}
