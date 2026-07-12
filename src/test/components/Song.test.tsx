import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import SongCard from "../../components/Song";
import { vi, describe, expect, it, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { PlayerProvider } from "../../context/PlayerContext";
import LikesReaderWriter from "../../services/LikesReaderWriter";

const mockPlaySong = vi.fn();

vi.mock("../../context/PlayerContext", async () => {
  const actual = await vi.importActual<any>("../../context/PlayerContext");
  return {
    ...actual,
    usePlayer: () => ({
      playSong: mockPlaySong,
      playPlaylist: vi.fn(),
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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../../services/LikesReaderWriter", () => {
  return {
    default: {
      likeSong: vi.fn(),
      unlikeSong: vi.fn(),
      isLiked: vi.fn().mockResolvedValue(false),
    },
  };
});

const mockSong = {
  name: "Test Song",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  album: "Test Album",
  duration: 123456,
  spotifyURL: "spotify:track:123",
  isLiked: false,
};

const mockSongLiked = {
  ...mockSong,
  isLiked: true,
};

describe("SongCard", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders song details", () => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <SongCard item={mockSong} />
      </PlayerProvider>
    );
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByTestId("song-image")).toBeInTheDocument();
  });

  it("plays the song upon click", () => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <SongCard item={mockSong} />
      </PlayerProvider>
    );
    const playButton = screen.getByTestId("play-song");
    fireEvent.click(playButton);
    expect(mockPlaySong).toHaveBeenCalledWith(mockSong.spotifyURL);
  });

  it("likes the song", async () => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <SongCard item={mockSong} />
      </PlayerProvider>
    );
    const unlikedButton = screen.getByTestId("unliked-icon");
    await userEvent.click(unlikedButton);
    expect(LikesReaderWriter.likeSong).toHaveBeenCalledWith("123", mockSong);
  });

  it("unlikes the song", async () => {
    render(
      <PlayerProvider isAuthenticated={true}>
        <SongCard item={mockSongLiked} />
      </PlayerProvider>
    );
    const likedButton = screen.getByTestId("liked-icon");
    await userEvent.click(likedButton);
    expect(LikesReaderWriter.unlikeSong).toHaveBeenCalledWith("123");
  });
});
