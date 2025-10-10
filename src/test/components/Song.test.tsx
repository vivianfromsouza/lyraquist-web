import { fireEvent, render, screen } from "@testing-library/react";
import SongCard from "../../components/Song";
import { vi, describe, expect, it, beforeAll, afterEach } from "vitest";

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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockSong = {
  name: "Test Song",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  album: "Test Album",
  duration: 123456,
  spotifyURL: "spotify:track:123",
};

describe("SongCard", () => {
  beforeAll(() => {
    render(<SongCard item={mockSong} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders song details", () => {
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByTestId("song-image")).toBeInTheDocument();
  });

  it("plays the song upon click", () => {
    expect(screen.getByTestId("play-song")).toBeInTheDocument();
    const playButton = screen.getByTestId("play-song");
    fireEvent.click(playButton);
    expect(mockPlaySong).toHaveBeenCalledWith(mockSong.spotifyURL);
  });
});
