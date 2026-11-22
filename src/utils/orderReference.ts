export function generateOrderReference(now: Date = new Date()): string {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0");
  return `LF-${datePart}-${randomPart}`;
}
