interface StarRatingProps {
  rating: number; // 0 to 5
  reviewCount: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5].map((position) => {
    if (rating >= position - 0.25) return "fas fa-star"; // full star
    if (rating >= position - 0.75) return "fas fa-star-half-alt"; // half star
    return "far fa-star"; // empty star
  });

  return (
    <div className="star-rating mb-2" role="img" aria-label={`Rated ${rating} out of 5 from ${reviewCount} reviews`}>
      {stars.map((starClass, index) => (
        <small key={index} className={`${starClass} text-primary`} aria-hidden="true"></small>
      ))}
      <small className="ms-1" aria-hidden="true">
        ({reviewCount})
      </small>
    </div>
  );
}
