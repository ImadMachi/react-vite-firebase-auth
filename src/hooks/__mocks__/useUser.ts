import { vi } from "vitest";

const useUser = vi.fn(() => ({ user: null, loading: true }));

export default useUser;
