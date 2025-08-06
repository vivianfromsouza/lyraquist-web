import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SettingsScreen from "../screens/SettingsScreen";
import { PlayerProvider } from "../context/PlayerContext";
import { FirebaseProvider } from "../services/firebase/FirebaseContext";

vi.mock("../services/firebase/LocalFirebaseClient", () => ({
  __esModule: true,
  default: { name: "mocked-firebase-app", options: {} },
}));
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "mocked-app", options: {} })),
  getApps: vi.fn(() => [{ name: "mocked-app", options: {} }]),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: "mockUserId" },
    signOut: vi.fn(),
  })),
  onAuthStateChanged: vi.fn(),
}));

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  update: vi.fn(),
  onValue: vi.fn(),
}));

// Mock localStorage for isLoggedIn
beforeAll(() => {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => (key === "isLoggedIn" ? "true" : null)),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});

vi.mock("../context/PlayerContext", async () => {
  const actual = await vi.importActual<any>("../context/PlayerContext");
  return {
    ...actual,
    usePlayer: () => ({
      playSong: vi.fn(),
      playPlaylist: vi.fn(),
      pausePlayback: vi.fn(),
      isPaused: false,
      isActive: true,
      currentTrack: null,
    }),
  };
});

describe("Settings", () => {
  it("renders Settings Screen", () => {
    render(
      <PlayerProvider>
        <FirebaseProvider>
          <BrowserRouter>
            <SettingsScreen />
          </BrowserRouter>
        </FirebaseProvider>
      </PlayerProvider>
    );
    expect(page.getByText("Settings")).toBeInTheDocument();
  });
});
