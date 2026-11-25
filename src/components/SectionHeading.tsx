interface SectionHeadingProps {
  lead?: string; // light text before the main words
  main: string; // bold green text
  trail?: string; // light text after the main words
  intro?: string; // short paragraph under the heading
  onBand?: boolean; // true when the heading sits on a green band (text turns white)
}

// Hairnic's section title: a light phrase mixed with a bold coloured phrase.
export default function SectionHeading({ lead, main, trail, intro, onBand = false }: SectionHeadingProps) {
  return (
    <div className="mx-auto text-center section-heading">
      <h2 className={"h1 mb-3 " + (onBand ? "text-white" : "text-primary")}>
        {lead && <span className="fw-light text-dark">{lead} </span>}
        {main}
        {trail && <span className="fw-light text-dark"> {trail}</span>}
      </h2>
      {intro && <p className={"mb-5 " + (onBand ? "text-white" : "")}>{intro}</p>}
    </div>
  );
}
