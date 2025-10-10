import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, beforeEach, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import CreateNewPlaylistForm from "../../components/CreateNewPlaylistForm";
import { mockSong } from "../Test.consts";
import PlaylistReaderWriter from "../../services/PlaylistReaderWriter";
import SongReaderWriter from "../../services/SongReaderWriter";

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

vi.mock("../../services/RecordReaderWriter", () => {
  return {
    default: {
      addSongToRecords: vi.fn(),
    },
  };
});

vi.mock("../../services/SongReaderWriter", () => {
  return {
    default: {
      isSongInDB: vi.fn(() => false),
      addSongToDBFromSongCard: vi.fn(),
    },
  };
});

vi.mock("../../services/PlaylistReaderWriter", () => {
  return {
    default: {
      createPlaylist: vi.fn(),
    },
  };
});

describe("CreateNewPlaylistForm", () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders CreateNewPlaylistForm", async () => {
    render(<CreateNewPlaylistForm songItem={mockSong} />);

    await screen.getByTestId("playlist-name-label");
    await screen.getByTestId("description-label");
    await screen.getByTestId("add-song");
  });

  it("creates a new playlist", async () => {
    localStorage.setItem("current_user", "mockUserId");
    render(<CreateNewPlaylistForm songItem={mockSong} />);

    const playlistNameInput = screen.getByTestId("playlist-name-input");
    await userEvent.type(playlistNameInput, "My Playlist");
    expect(playlistNameInput).toHaveValue("My Playlist");

    const descriptionInput = screen.getByTestId("description-input");
    await userEvent.type(descriptionInput, "My Description");
    expect(descriptionInput).toHaveValue("My Description");

    const addSongButton = screen.getByTestId("add-song");
    await userEvent.click(addSongButton);
    expect(PlaylistReaderWriter.createPlaylist).toHaveBeenCalledWith(
      "My Playlist",
      "My Description",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
    );
    expect(SongReaderWriter.addSongToDBFromSongCard).toHaveBeenCalledWith(
      mockSong
    );
  });
});
