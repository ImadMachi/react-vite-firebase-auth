import useUser from "@hooks/useUser";
import Register from "@pages/Register";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import { describe, Mock, test, vi } from "vitest";

vi.mock("@hooks/useUser", () => {
  const mockedUseUser = vi.fn(() => ({ user: null, loading: true }));
  return {
    default: mockedUseUser,
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("firebase/auth", async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    fetchSignInMethodsForEmail: vi.fn(),
  };
});

describe("Register", () => {
  test("should show a loader when user is loading", () => {
    render(<Register />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("should render the register form inputs", async () => {
    (useUser as Mock).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Register" }).className).toContain("heading");
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });

  test("should show error message when a field is empty", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    await waitFor(() => {
      act(() => {
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });
      expect(screen.getByText("Please enter a Username")).toBeInTheDocument();
      expect(screen.getByText("Please enter an Email")).toBeInTheDocument();
      expect(screen.getByText("Please enter a Password")).toBeInTheDocument();
      expect(screen.getByText("Password does not match")).toBeInTheDocument();
    });
  });

  test("should show username validation error message when username is invalid", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      act(() => {
        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "te" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });

      expect(screen.getByText("Username should contains only letters and digits, and 3 letters min")).toBeInTheDocument();
    });
  });

  test("should show email validation error message when email is invalid", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      act(() => {
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });
      expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    });
  });

  test("should show password validation error message when password is invalid", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      act(() => {
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "test" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });
      expect(screen.getByText("Password requires at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character")).toBeInTheDocument();
    });
  });

  test("should show password validation error message when password does not match", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      act(() => {
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Test1234!" } });
        fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "Test1234" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });
      expect(screen.getByText("Password does not match")).toBeInTheDocument();
    });
  });

  test("should show error message when email already used", async () => {
    (fetchSignInMethodsForEmail as Mock).mockReturnValueOnce([{}]);
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      act(() => {
        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@email.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "John@2023" } });
        fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "John@2023" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
      });
      expect(screen.getByText("User with this email already exists")).toBeInTheDocument();
    });
  });
});
