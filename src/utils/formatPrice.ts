const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export function formatPrice(value: number): string {
  return dollars.format(value);
}
