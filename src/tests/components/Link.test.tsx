import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Link from "@components/Link";
import { MemoryRouter } from "react-router-dom";

describe("Link", () => {
  test("renders the link with the correct text and props", () => {
    const text = "About";
    const url = "/about";
    render(
      <MemoryRouter>
        <Link to={url}>{text}</Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link", { name: text });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.className).toContain("link"); // assuming the SCSS class is "link"
    expect(linkElement).toHaveAttribute("href", url);
  });
});
