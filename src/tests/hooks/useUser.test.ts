import useUser from "@hooks/useUser";
import { renderHook } from "@testing-library/react";
import { mockedUser } from "../utils/firebase";
import { vi } from "vitest";
import { auth } from "../../firebase";

vi.mock("../../firebase", () => ({
  auth: {
    onAuthStateChanged: vi.fn(),
  },
}));

describe("useUser", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should return user and loading state", async () => {
    auth.onAuthStateChanged = vi.fn().mockImplementation((callback) => {
      callback(mockedUser);
      return vi.fn();
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toEqual(mockedUser);
    expect(result.current.loading).toEqual(false);
    expect(auth.onAuthStateChanged).toHaveBeenCalled();
  });
});
