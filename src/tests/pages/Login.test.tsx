import useUser from "@hooks/__mocks__/useUser";
import Login from "@pages/Login";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { mockedUser } from "../utils/firebase";
import { describe, Mock, test, vi } from "vitest";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
  };
});

vi.mock("@hooks/useUser", () => ({ default: useUser }));
// vi.mock("@hooks/useUser", () => {
//   const mockedUseUser = vi.fn(() => ({ user: null, loading: true }));
//   return {
//     default: mockedUseUser,
//   };
// });

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe("Login", () => {
  test("should show a loader when user is loading", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("should render the login form inputs", async () => {
    (useUser as Mock).mockReturnValue({ user: null, loading: false }); // this will generalized to all comming tests (use mockReturnValueOnce for specific test)

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Login" }).className).toContain("heading");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Register" })).toBeInTheDocument();
  });

  test("should display error message when email or password is not provided", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /Login/i });
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(screen.getByText("Please enter an Email")).toBeInTheDocument();
      expect(screen.getByText("Please enter a Password")).toBeInTheDocument();
    });
  });

  test("should display error message when firebase authentification fails", async () => {
    (signInWithEmailAndPassword as Mock).mockRejectedValueOnce(new Error());

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /Login/i });
      act(() => {
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@test.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password" } });
        fireEvent.click(submitButton);
      });
      expect(screen.getByText("something went wrong")).toBeInTheDocument();
    });
  });

  test("should redirect to home page when firebase authentification succeeeds", async () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
});
