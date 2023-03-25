import useTheme from "@hooks/useTheme";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("hooks/useTheme", () => {
  test("should toggle the theme from light to dark", () => {
    const { result } = renderHook(() => useTheme());
    expect(document.body.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });
    expect(document.body.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("should toggle the theme from dark to light", () => {
    // LocalStorage still preserves the theme value
    const { result } = renderHook(() => useTheme());
    expect(document.body.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.body.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
