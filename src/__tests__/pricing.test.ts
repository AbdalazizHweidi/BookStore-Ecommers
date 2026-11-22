import { describe, expect, it } from "vitest";
import { buildCartLines, calculateTotals } from "../utils/pricing";
import { generateOrderReference } from "../utils/orderReference";

describe("Order calculations", () => {
  it("adds flat shipping to a small order", () => {
    const lines = buildCartLines([{ bookId: "pip-paper-boat", quantity: 1 }]); // $9.99
    expect(calculateTotals(lines)).toEqual({ subtotal: 9.99, shipping: 4.99, total: 14.98 });
  });

  it("makes shipping free from $35", () => {
    const lines = buildCartLines([{ bookId: "last-lighthouse-keeper", quantity: 3 }]); // 3 x $16.99
    expect(calculateTotals(lines)).toEqual({ subtotal: 50.97, shipping: 0, total: 50.97 });
  });

  it("does not show floating-point errors", () => {
    const lines = buildCartLines([{ bookId: "marigold-street", quantity: 3 }]); // 3 x $14.99
    expect(calculateTotals(lines).subtotal).toBe(44.97);
  });

  it("is all zeros for an empty cart", () => {
    expect(calculateTotals([])).toEqual({ subtotal: 0, shipping: 0, total: 0 });
  });

  it("ignores saved ids that are not in the book list", () => {
    expect(buildCartLines([{ bookId: "does-not-exist", quantity: 1 }])).toEqual([]);
  });
});

describe("Order reference", () => {
  it("looks like LF-YYYYMMDD-XXXXXX", () => {
    expect(generateOrderReference(new Date("2026-11-18T12:00:00Z"))).toMatch(/^LF-20261118-[A-Z0-9]{6}$/);
  });
});
