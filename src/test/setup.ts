import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement window.scrollTo, so we replace it with a do-nothing function.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
