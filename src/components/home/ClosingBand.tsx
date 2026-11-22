import { Link } from "react-router-dom";

export default function ClosingBand() {
  return (
    <section className="container-fluid bg-primary closing-band py-5">
      <div className="container">
        <h2 className="text-white">Ready for your next read?</h2>
        <Link to="/books" className="btn btn-dark py-2 px-4">Browse Books</Link>
      </div>
    </section>
  );
}
