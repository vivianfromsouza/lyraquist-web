import { render, screen } from "@testing-library/react";
import LyricsPanel from "../../components/LyricsToScreen";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { PlayerProvider } from "../../context/PlayerContext";

const mockPlaySong = vi.fn();

vi.mock("../../services/LyricsService", () => {
  return {
    __esModule: true,
    default: {
      getLyrics: vi.fn(() => Promise.resolve("these are the mock lyrics\nline two words")),
    },
  };
});

vi.mock("../../context/PlayerContext", () => {
  return {
    __esModule: true,
    PlayerProvider: ({ children }: any) => children,
    usePlayer: () => ({
      playSong: mockPlaySong,
      playPlaylist: vi.fn(),
      pausePlayback: vi.fn(),
      isPaused: false,
      isActive: true,
      currentTrack: null,
      accessToken: "fake-access-token",
    }),
  };
});
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "mocked-app" })),
  getApps: vi.fn(() => [{ name: "mocked-app" }]),
}));
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({ currentUser: { uid: "mockUserId" } })),
  onAuthStateChanged: vi.fn(),
  deleteUser: vi.fn(),
  verifyBeforeUpdateEmail: vi.fn(),
}));
vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(),
  ref: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),

  onValue: vi.fn(),
}));

const mockCurrentTrack = {
  name: "Test Song",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  album: "Test Album",
  duration: 123456,
  spotifyURL: "spotify:track:123",
};

describe("LyricsPanel", () => {
  beforeEach(() => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <LyricsPanel currentTrack={mockCurrentTrack} />
      </PlayerProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders song details", () => {
    expect(screen.getByText("TRANSLATION")).toBeInTheDocument();
  });
});
