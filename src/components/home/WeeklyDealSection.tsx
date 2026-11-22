import { useEffect, useState } from "react";
import { getBookById, weeklyDealBookId } from "../../data/books";
import { getEndOfWeek, useCountdown } from "../../hooks/useCountdown";
import { useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils/formatPrice";

export default function WeeklyDealSection() {
  const book = getBookById(weeklyDealBookId)!;
  const [endOfWeek, setEndOfWeek] = useState(() => getEndOfWeek());
  const timeLeft = useCountdown(endOfWeek);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const timerId = setTimeout(() => setEndOfWeek(getEndOfWeek()), Math.max(0, endOfWeek.getTime() - Date.now() + 1));
    return () => clearTimeout(timerId);
  }, [endOfWeek]);

  return (
    <section className="container-fluid deal bg-primary py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5 text-center">
            <img className="book-cover deal-cover" src={book.cover} alt={`${book.title} by ${book.author}, book cover`}
              width={600} height={900} loading="lazy" />
          </div>
          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5">
              <h2 className="text-primary">Weekly deal: {book.title}</h2>
              <p>by {book.author}</p>
              <p>{book.hook}</p>
              <p className="h4 text-primary">
                {formatPrice(book.price)}
                {book.originalPrice !== undefined && <del className="deal-old-price text-secondary ms-2">{formatPrice(book.originalPrice)}</del>}
              </p>
              <p>Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
              <button type="button" className="btn btn-primary py-2 px-4" onClick={() => addToCart(book.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
