import { useState } from "react";
import { getBookById, weeklyDealBookId } from "../../data/books";
import { getEndOfWeek, useCountdown } from "../../hooks/useCountdown";
import { useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils/formatPrice";

function twoDigits(value: number): string {
  return String(value).padStart(2, "0");
}

// Hairnic's "Deals of the Day" band (bottle + white card + countdown) -> Book of the Week.
export default function WeeklyDealSection() {
  const book = getBookById(weeklyDealBookId)!;
  const addToCart = useCartStore((state) => state.addToCart);
  const [endOfWeek] = useState(() => getEndOfWeek());
  const timeLeft = useCountdown(endOfWeek);

  const countdownParts = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="container-fluid deal bg-primary my-5 py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 text-center">
            <img
              className="book-cover deal-cover"
              src={book.cover}
              alt={`${book.title} by ${book.author}, book cover`}
              width={600}
              height={900}
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <div className="bg-white text-center p-4">
              <div className="border p-4">
                <p className="mb-2">Book of the week in {book.category}</p>
                <h2 className="fw-bold mb-4">Deal of the Week</h2>
                <p className="display-4 text-primary mb-4">
                  {formatPrice(book.price)}
                  {book.originalPrice !== undefined && (
                    <del className="deal-old-price ms-3 text-secondary">
                      <span className="visually-hidden">Original price </span>
                      {formatPrice(book.originalPrice)}
                    </del>
                  )}
                </p>
                <h3 className="h5">{book.title}</h3>
                <p className="mb-1">by {book.author}</p>
                <p className="mb-4">{book.hook}</p>

                <p className="mb-2">Offer ends in</p>
                <div className="row g-0 cdt mb-4" role="timer" aria-label="Time left on this offer">
                  {countdownParts.map((part) => (
                    <div key={part.label} className="col-3">
                      <p className="display-6 mb-0">
                        {twoDigits(part.value)}
                        <span>{part.label}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <button type="button" className="btn btn-primary py-2 px-4" onClick={() => addToCart(book.id)}>
                  Add to Cart<span className="visually-hidden">: {book.title}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
