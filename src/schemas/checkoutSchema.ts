import { z, type ZodError } from "zod";

export const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Other"];


export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address, like name@example.com."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(/^\+?[\d\s-]{7,15}$/, "Enter a valid phone number (digits, spaces or dashes)."),
  address: z.string().trim().min(5, "Enter your street address."),
  city: z.string().trim().min(2, "Enter your city."),
  postalCode: z.string().trim().min(3, "Enter your postal code."),
  country: z.string().min(1, "Choose your country."),
  deliveryNotes: z.string().trim().max(200, "Keep delivery notes under 200 characters."),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type CheckoutErrors = Partial<Record<keyof CheckoutFormValues, string>>;

// Turns Zod's list of issues into { fieldName: "first message" }.
export function getFieldErrors(error: ZodError): CheckoutErrors {
  const errors: CheckoutErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof CheckoutFormValues;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
