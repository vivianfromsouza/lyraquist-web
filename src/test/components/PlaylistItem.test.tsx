import { render, screen } from "@testing-library/react";
import PlaylistItem from "../../components/PlaylistItem";
import { vi, describe, expect, it, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { PlayerProvider } from "../../context/PlayerContext";
import RecordReaderWriter from "../../services/RecordReaderWriter";

const mockPlaySong = vi.fn();
const mockPlayPlaylist = vi.fn();

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
      playPlaylist: mockPlayPlaylist,
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

vi.mock("../../services/RecordReaderWriter", () => {
  return {
    default: {
      likeSongByURL: vi.fn(),
      unlikeSongByURL: vi.fn(),
      deleteSongFromPlaylist: vi.fn(),
    },
  };
});

const mockPlaylistItem = {
  playlistURL: "spotify:playlist:12345",
  spotifyURL: "spotify:track:12345",
  name: "Test PlaylistItem",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  isLiked: false,
  recordID: "1",
};

const mockPlaylistItemLiked = {
  playlistURL: "spotify:playlist:12345",
  spotifyURL: "spotify:track:12345",
  name: "Test PlaylistItem",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  isLiked: true,
  recordID: "1",
};

const mockPlaylistURL = "spotify:playlist:12345";
console.log(mockPlaylistURL)

describe("PlaylistItem", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders PlaylistItem", () => {
    render(
      <PlayerProvider>
        <PlaylistItem
          item={mockPlaylistItem}
          playlistURL={"spotify:playlist:12345"}
        />
      </PlayerProvider>
    );
    expect(screen.getByText("Test PlaylistItem")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-item-image")).toBeInTheDocument();
    expect(screen.getByTestId("unliked-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("likes the song", async () => {
    render(
      <PlayerProvider>
        <PlaylistItem
          item={mockPlaylistItem}
          playlistURL={"spotify:playlist:12345"}
        />
      </PlayerProvider>
    );
    const unlikedButton = screen.getAllByTestId("unliked-icon")[0];
    (await unlikedButton).click();
    expect(RecordReaderWriter.likeSongByURL).toHaveBeenCalledWith(
      "spotify:track:12345",
      mockPlaylistItem
    );
  });

  it("deletes the song from playlist", async () => {
    render(
      <PlayerProvider>
        <PlaylistItem
          item={mockPlaylistItem}
          playlistURL={"spotify:playlist:12345"}
        />
      </PlayerProvider>
    );
    const deleteIcon = screen.getAllByTestId("delete-icon")[0];
    await userEvent.click(deleteIcon);
  });
  
  it("unlikes the song", async () => {
    render(
      <PlayerProvider>
        <PlaylistItem
          item={mockPlaylistItemLiked}
          playlistURL={"spotify:playlist:12345"}
        />
      </PlayerProvider>
    );
    const likedButton = await screen.findByTestId("liked-icon");
    await userEvent.click(likedButton);
    expect(RecordReaderWriter.unlikeSongByURL).toHaveBeenCalledWith(
      "spotify:track:12345"
    );
  });
});
