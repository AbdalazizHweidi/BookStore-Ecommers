
import { Link } from "react-router-dom";

type Props = {
  icon: string;
  title: string;
  message: string;
  actionLabel: string;
  actionTo?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
}: Props) {
  return (
    <div className="text-center py-5">
      <i
        className={`fas ${icon} fa-3x text-secondary mb-3`}
        aria-hidden="true"
      />

      <h2 className="h4">{title}</h2>

      <p className="text-secondary mb-4">
        {message}
      </p>

      {actionTo ? (
        <Link className="btn btn-primary" to={actionTo}>
          {actionLabel}
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
          disabled={!onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
