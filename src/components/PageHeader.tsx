import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string; // the last crumb has no link
}

interface PageHeaderProps {
  title: string;
  crumbs: Crumb[];
}

// The green title band at the top of every page except Home (same as Hairnic's inner pages).
export default function PageHeader({ title, crumbs }: PageHeaderProps) {
  return (
    <div className="container-fluid bg-primary hero-header hero-header--inner mb-5">
      <div className="container text-center">
        <h1 className="display-4 text-white mb-3">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb justify-content-center mb-0">
            {crumbs.map((crumb) =>
              crumb.to ? (
                <li key={crumb.label} className="breadcrumb-item">
                  <Link className="text-white" to={crumb.to}>
                    {crumb.label}
                  </Link>
                </li>
              ) : (
                <li key={crumb.label} className="breadcrumb-item text-white active" aria-current="page">
                  {crumb.label}
                </li>
              ),
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
}
