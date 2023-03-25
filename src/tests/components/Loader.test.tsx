import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loader from "@components/Loader";

describe("Loader", () => {
  test("should render loader", () => {
    render(<Loader dataTestId="loader" />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
    expect(loader.className).toContain("loader");
  });
});
