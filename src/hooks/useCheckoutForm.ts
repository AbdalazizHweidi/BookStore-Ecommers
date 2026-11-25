import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  checkoutSchema,
  getFieldErrors,
  type CheckoutErrors,
  type CheckoutFormValues,
} from "../schemas/checkoutSchema";

const emptyForm: CheckoutFormValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  deliveryNotes: "",
};

// Handles typing, validation and submitting for the checkout form.
// `onValidSubmit` is only called when every field passes the Zod schema.
export function useCheckoutForm(onValidSubmit: (values: CheckoutFormValues) => void) {
  const [values, setValues] = useState<CheckoutFormValues>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof CheckoutFormValues;
    const value = event.target.value;
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear the message for this field as soon as the visitor edits it.
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = checkoutSchema.safeParse(values);
    if (!result.success) {
      setErrors(getFieldErrors(result.error)); // invalid: show messages, do not submit
      return;
    }
    setErrors({});
    onValidSubmit(result.data);
  }

  return { values, errors, handleChange, handleSubmit };
}
