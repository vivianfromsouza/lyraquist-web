import { render, screen } from "@testing-library/react";
import LyricsPanel from "../../components/LyricsPanel";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { PlayerProvider } from "../../context/PlayerContext";

const mockPlaySong = vi.fn();

const mockLyricsResponse = {
  // shape should match what LyricsPanel expects; adjust fields if necessary
  lyrics: "these are the mock lyrics\nline two words",
  language: "en",
  synced: [], // or whatever the component expects
};

vi.mock("../../services/LyricsService", () => {
  return {
    __esModule: true,
    default: {
      getLyrics: vi.fn(() => Promise.resolve("these are the mock lyrics\nline two words")),
    },
  };
});

vi.mock("../../context/PlayerContext", () => {
  // simple synchronous mock — safe for hoisting
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
// minimal firebase mocks if component imports them
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
      <PlayerProvider>
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
