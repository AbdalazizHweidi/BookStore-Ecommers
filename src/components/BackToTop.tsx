import { useScrolled } from "../hooks/useScrolled";

// Hairnic's round "back to top" button.
export default function BackToTop() {
  const visible = useScrolled(100);
  if (!visible) return null;

  return (
    <button
      type="button"
      className="btn btn-lg btn-primary btn-lg-square back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
}
