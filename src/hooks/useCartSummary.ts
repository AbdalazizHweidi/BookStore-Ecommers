import { useMemo } from "react";
import { useCartStore } from "../store/cartStore";
import { buildCartLines, calculateTotals } from "../utils/pricing";

export function useCartSummary() {
  const items = useCartStore((state) => state.items);
  return useMemo(() => {
    const lines = buildCartLines(items);
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    return { lines, itemCount, ...calculateTotals(lines) };
  }, [items]);
}
