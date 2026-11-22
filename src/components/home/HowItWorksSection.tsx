import SectionHeading from "../SectionHeading";

const steps = [
  { title: "Choose your books", text: "Browse the shelves and find your next read." },
  { title: "Add to your cart", text: "Save the books you want and review your order." },
  { title: "Check out", text: "Enter your delivery details to complete your order." },
];

export default function HowItWorksSection() {
  return (
    <section className="container-fluid bg-primary py-5">
      <div className="container">
        <SectionHeading lead="How it" main="Works" onBand />
        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-md-4 text-center text-white" key={step.title}>
              <span className="h1 text-white">{index + 1}</span>
              <h3 className="h5 text-white">{step.title}</h3>
              <p className="mb-0">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
