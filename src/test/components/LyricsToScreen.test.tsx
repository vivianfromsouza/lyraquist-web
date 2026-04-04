import { render, screen, waitFor, cleanup } from "@testing-library/react";
import LyricsToScreen from "../../components/LyricsToScreen";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { PlayerProvider } from "../../context/PlayerContext";
import LyricsService from "../../services/LyricsService";
import TranslationService from "../../services/TranslationService";
import UserReaderWriter from "../../services/UserReaderWriter";

const mockPlaySong = vi.fn();

vi.mock("../../services/UserReaderWriter", () => ({
  __esModule: true,
  default: {
    getPreferredLanguage: vi.fn(() => Promise.resolve("en")),
  },
}));

vi.mock("../../services/LyricsService", () => ({
  __esModule: true,
  default: {
    getLyrics: vi.fn(() => Promise.resolve("these are the mock lyrics\nline two words")),
  },
}));

vi.mock("../../services/TranslationService", () => ({
  __esModule: true,
  default: {
    getTranslationAllLyrics: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            translations: [{ text: "estas son las letras simuladas\nlínea dos palabras" }],
            detectedLanguage: { language: "es" },
          },
        ],
      })
    ),
  },
}));

vi.mock("../../context/PlayerContext", () => ({
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
}));

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

describe("LyricsToScreen", () => {
  beforeEach(async () => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <LyricsToScreen currentTrack={mockCurrentTrack} />
      </PlayerProvider>
    );
    // Wait for async operations to complete and lyrics to render
    await waitFor(() => {
      expect(screen.getByText("these")).toBeInTheDocument();
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the translation header", () => {
    expect(screen.getByText("TRANSLATION")).toBeInTheDocument();
  });

  it("calls getLyrics on mount", () => {
    expect(LyricsService.getLyrics).toHaveBeenCalledWith(mockCurrentTrack);
  });

  it("calls getPreferredLanguage", () => {
    expect(UserReaderWriter.getPreferredLanguage).toHaveBeenCalled();
  });

  it("calls getTranslationAllLyrics with correct parameters", () => {
    expect(TranslationService.getTranslationAllLyrics).toHaveBeenCalledWith(
      "these are the mock lyrics\nline two words",
      "en"
    );
  });

  it("renders LyricsPanel with correct props", () => {
    // Check if lyrics words are rendered
    expect(screen.getByText("these")).toBeInTheDocument();
    expect(screen.getByText("lyrics")).toBeInTheDocument();
  });

  it("renders TranslationPanel with correct props", () => {
    // Check if translation words are rendered
    expect(screen.getByText("estas")).toBeInTheDocument();
    expect(screen.getByText("letras")).toBeInTheDocument();
  });
});