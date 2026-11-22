import { Link } from "react-router-dom";
import { aboutShelfBookIds, getBookById } from "../../data/books";

export default function AboutSection() {
  const books = aboutShelfBookIds.map((id) => getBookById(id)!);

  return (
    <section className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="cover-fan">
              {books.map((book, index) => (
                <img key={book.id} className={`book-cover cover-fan__item cover-fan__item--${index + 1}`}
                  src={book.cover} alt={`${book.title} by ${book.author}, book cover`} width={600} height={900} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="text-primary">A little about Leaflet</h2>
            <p>We bring together stories for curious readers, from mysteries and fantasy to books for the whole family.</p>
            <Link to="/books" className="btn btn-primary py-2 px-4">Explore our shelves</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
