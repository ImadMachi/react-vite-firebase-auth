import { User } from "firebase/auth";
import { vi } from "vitest";

export const mockedUser: User = {
  uid: "123",
  email: "imdoxmachi@gmail.com",
  displayName: "imdoxmachi",
  photoURL: "https://avatars.githubusercontent.com/u/6136383?v=4",
  emailVerified: true,
  isAnonymous: false,
  tenantId: null,
  providerData: [],
  metadata: {
    creationTime: "2021-08-01T09:00:00.000Z",
    lastSignInTime: "2021-08-01T09:00:00.000Z",
  },
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  delete: vi.fn(),
  refreshToken: "123",
  toJSON: vi.fn(),
  phoneNumber: null,
  providerId: "firebase",
};
