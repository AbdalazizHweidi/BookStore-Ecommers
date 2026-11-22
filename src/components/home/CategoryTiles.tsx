import { Link } from "react-router-dom";
import { books } from "../../../../src/data/books";
import { categories } from "../../../../src/data/categories";
import SectionHeading from "../../../../src/components/SectionHeading";

// Hairnic's three green feature boxes -> one green tile per book category.
export default function CategoryTiles() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <SectionHeading lead="Shop by" main="Category" intro="Pick a shelf and see every book on it." />
        <div className="row g-4">
          {categories.map((category) => {
            const bookCount = books.filter((book) => book.category === category.name).length;
            return (
              <div key={category.name} className="col-6 col-lg-4">
                <Link
                  to={`/books?category=${encodeURIComponent(category.name)}`}
                  className="feature-item category-tile position-relative d-block bg-primary text-center p-3 h-100"
                >
                  <div className="border py-4 px-3 h-100">
                    <i className={`fa ${category.icon} fa-3x text-dark mb-3`} aria-hidden="true"></i>
                    <h3 className="h5 text-white mb-1">{category.name}</h3>
                    <p className="category-tile__blurb text-white mb-1">{category.blurb}</p>
                    <small className="text-white">
                      {bookCount} {bookCount === 1 ? "book" : "books"}
                    </small>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
