import { Link } from "react-router-dom";
import { books } from "../../data/books";
import SectionHeading from "../SectionHeading";

// Hairnic's newsletter band -> a closing call to action. (There is no newsletter form because
// the assignment has no backend to send emails.)
export default function ClosingBand() {
  return (
    <div className="container-fluid how-to-use closing-band bg-primary my-5 py-5">
      <div className="container py-5">
        <SectionHeading
          lead="Your next favourite book"
          main="is on the shelf"
          intro={`Browse all ${books.length} titles, filter by price, and save the ones you want to read.`}
          onBand
        />
        <div className="text-center">
          <Link to="/books" className="btn btn-dark py-2 px-4">
            Browse All Books
          </Link>
        </div>
      </div>
    </div>
  );
}
