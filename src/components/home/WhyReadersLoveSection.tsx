import { getBookById, heroBookId, heroBookReasons } from "../../data/books";
import SectionHeading from "../SectionHeading";

function ReasonItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="col-12 d-flex">
      <div className="btn-square rounded-circle border flex-shrink-0 reason-icon">
        <i className="fa fa-check fa-2x text-primary" aria-hidden="true"></i>
      </div>
      <div className="ps-3">
        <h3 className="h5">{title}</h3>
        <hr className="w-25 bg-primary my-2" />
        <span>{text}</span>
      </div>
    </div>
  );
}

// Hairnic's "Best benefits" block (3 left, bottle in the middle, 3 right) -> why readers love this book.
export default function WhyReadersLoveSection() {
  const book = getBookById(heroBookId)!;
  const leftReasons = heroBookReasons.slice(0, 3);
  const rightReasons = heroBookReasons.slice(3, 6);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <SectionHeading
          lead="Why readers love"
          main={book.title}
          intro="Early readers kept telling us the same six things about this book."
        />
        <div className="row g-4 align-items-center">
          <div className="col-lg-4 order-2 order-lg-1">
            <div className="row g-5">
              {leftReasons.map((reason) => (
                <ReasonItem key={reason.title} {...reason} />
              ))}
            </div>
          </div>
          <div className="col-lg-4 order-1 order-lg-2 text-center">
            <img
              className="book-cover reasons-cover"
              src={book.cover}
              alt={`${book.title} by ${book.author}, book cover`}
              width={600}
              height={900}
              loading="lazy"
            />
          </div>
          <div className="col-lg-4 order-3">
            <div className="row g-5">
              {rightReasons.map((reason) => (
                <ReasonItem key={reason.title} {...reason} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
