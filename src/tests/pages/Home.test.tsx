import Home from "@pages/Home";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";

describe("Home", () => {
  test("Should render", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const homeElement = screen.getByTestId("home");
    expect(homeElement).toBeInTheDocument();
  });
});
