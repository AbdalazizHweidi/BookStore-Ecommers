import { getBookById, heroBookId, heroBookReasons } from "../../data/books";
import SectionHeading from "../SectionHeading";

export default function WhyReadersLoveSection() {
  const book = getBookById(heroBookId)!;

  return (
    <section className="container-fluid py-5">
      <div className="container">
        <SectionHeading lead="Why readers love" main={book.title} />
        <div className="row g-4 align-items-center">
          <div className="col-lg-4 text-center">
            <img className="book-cover reasons-cover" src={book.cover} alt={`${book.title} by ${book.author}, book cover`}
              width={600} height={900} loading="lazy" />
          </div>
          <div className="col-lg-8">
            <div className="row g-4">
              {heroBookReasons.map((reason) => (
                <div className="col-md-6" key={reason.title}>
                  <h3 className="h5">{reason.title}</h3>
                  <p className="mb-0">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
