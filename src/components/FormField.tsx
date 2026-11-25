import type { ChangeEvent } from "react";

interface FormFieldProps {
  name: string;
  label: string;
  value: string;
  error?: string; // the validation message, shown right under the field
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  options?: string[]; // when given, the field is a dropdown
  multiline?: boolean; // when true, the field is a textarea
  optional?: boolean;
}

// One label + input + error message. Used for every field on the checkout form.
export default function FormField({
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  options,
  multiline = false,
  optional = false,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const sharedProps = {
    id,
    name,
    value,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  const stateClass = error ? " is-invalid" : "";

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {optional && <span className="text-secondary"> (optional)</span>}
      </label>

      {options ? (
        <select {...sharedProps} className={"form-select" + stateClass} autoComplete={autoComplete}>
          <option value="">Choose your country</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea {...sharedProps} className={"form-control" + stateClass} rows={3} />
      ) : (
        <input {...sharedProps} type={type} className={"form-control" + stateClass} autoComplete={autoComplete} />
      )}

      {error && (
        <div id={errorId} className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}
