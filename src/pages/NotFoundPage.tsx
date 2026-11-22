import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";

export default function NotFoundPage() {
  return (
    <>
      <PageHeader title="Page Not Found" crumbs={[{ label: "Home", to: "/" }, { label: "404" }]} />
      <div className="container-fluid pb-5">
        <div className="container">
          <EmptyState
            icon="fa-book-open"
            title="This page is not on our shelves"
            message="The address may have a typo, or the page may have moved. The home page is a good place to start again."
            actionLabel="Go to Home"
            actionTo="/"
          />
        </div>
      </div>
    </>
  );
}
