import { render, screen } from "@testing-library/react";
import Playlist from "../../components/Playlist";
import { vi, describe, expect, it, beforeAll, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";

const mockPlaySong = vi.fn();

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "mocked-app" })),
  getApps: vi.fn(() => [{ name: "mocked-app" }]),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: "mockUserId" },
    signOut: vi.fn(),
  })),
  onAuthStateChanged: vi.fn(),
  deleteUser: vi.fn(),
  verifyBeforeUpdateEmail: vi.fn(),
}));

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  update: vi.fn(),
  onValue: vi.fn(),
}));

vi.mock("../services/firebase/LocalFirebaseClient", () => ({
  __esModule: true,
  default: { name: "mocked-app" },
}));

vi.mock("../context/PlayerContext", async () => {
  const actual = await vi.importActual<any>("../context/PlayerContext");
  return {
    ...actual,
    usePlayer: () => ({
      playSong: mockPlaySong,
      playPlaylist: vi.fn(),
      pausePlayback: vi.fn(),
      isPaused: false,
      isActive: true,
      currentTrack: null,
    }),
  };
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockPlaylist = {
  name: "Test Playlist",
  image_url: "https://picsum.photos/536/354",
};

describe("Playlist", () => {
  beforeAll(() => {
    render(<Playlist item={mockPlaylist} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Playlist", () => {
    expect(screen.getByText("Test Playlist")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-image")).toBeInTheDocument();
  });

  it("goes to playlist screen", async () => {
    const playlistButton = screen.getByTestId("playlist-image");
    await userEvent.click(playlistButton);
    expect(mockNavigate).toHaveBeenCalledWith("/playlist/", {
      state: {
        image_url: "https://picsum.photos/536/354",
        name: "Test Playlist",
      },
    });
  });
});
