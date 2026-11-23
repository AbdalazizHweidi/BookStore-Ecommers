import SectionHeading from "../SectionHeading";

const steps = [
  {
    icon: "fa-book-open",
    title: "Pick your books",
    text: "Browse by category or search by title or author. Tap the heart to save books for later.",
  },
  {
    icon: "fa-shopping-cart",
    title: "Review your cart",
    text: "Change quantities, remove anything you changed your mind about, and see your total before you commit.",
  },
  {
    icon: "fa-box",
    title: "Place your order",
    text: "Enter your delivery details and get an order reference. This is a demo store, so no payment is taken.",
  },
];

// Hairnic's three "How to use" steps on a green band -> how ordering works.
export default function HowItWorksSection() {
  return (
    <section className="container-fluid how-to-use bg-primary my-5 py-5">
      <div className="container text-white py-5">
        <SectionHeading lead="How it works:" main="From the shelf" trail="to your door" onBand />
        <div className="row g-5">
          {steps.map((step) => (
            <div key={step.title} className="col-lg-4 text-center">
              <div className="btn-square rounded-circle border mx-auto mb-4 step-icon">
                <i className={`fa ${step.icon} fa-3x text-dark`} aria-hidden="true"></i>
              </div>
              <h3 className="h5 text-white">{step.title}</h3>
              <hr className="w-25 bg-light my-2 mx-auto" />
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}