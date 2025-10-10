import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, beforeEach, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import AddSongToPlaylistScreen from "../screens/AddSongToPlaylistScreen";
import { BrowserRouter } from "react-router-dom";
import { mockSong, mockPlaylists } from "./Test.consts.js";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/add-song",
      state: { item: mockSong },
    }),
  };
});

vi.mock("../services/SongReaderWriter", () => {
  return {
    default: {
      isSongInDB: vi.fn(() => true),
      addSongToDBFromSongCard: vi.fn(),
    },
  };
});

const MockedSongReaderWriter = vi.mocked(SongReaderWriter);

vi.mock("../services/RecordReaderWriter", () => {
  return {
    default: {
      addSongToRecords: vi.fn(),
    },
  };
});

vi.mock("../services/PlaylistReaderWriter", () => {
  return {
    default: {
      getMyPlaylists: vi.fn(() => mockPlaylists),
      createPlaylist: vi.fn(),
    },
  };
});

describe("AddSongToPlaylistScreen", () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders AddSongToPlaylistScreen", async () => {
    render(
      <BrowserRouter>
        <AddSongToPlaylistScreen />
      </BrowserRouter>
    );

    await screen.getByTestId("add-song-title");
    await screen.getByTestId("playlist-dropdown");
    await screen.getByTestId("add-song");
  });

  it("adds a song to a playlist, not already in db", async () => {
    MockedSongReaderWriter.isSongInDB.mockResolvedValue(false);
    localStorage.setItem("current_user", "mockUserId");
    render(
      <BrowserRouter>
        <AddSongToPlaylistScreen />
      </BrowserRouter>
    );

    expect(PlaylistReaderWriter.getMyPlaylists).toHaveBeenCalled();

    const playlistDropdown = screen.getByRole("option");
    playlistDropdown.click();
    const playlistOption = await screen.findByText("My Playlist");
    playlistOption.click();

    const addSongButton = screen.getByTestId("add-song");
    await userEvent.click(addSongButton);

    expect(SongReaderWriter.isSongInDB).toHaveBeenCalledWith(
      mockSong.spotifyURL.split(":")[2]
    );
    expect(SongReaderWriter.addSongToDBFromSongCard).toHaveBeenCalledWith(
      mockSong
    );
    expect(RecordReaderWriter.addSongToRecords).toHaveBeenCalledWith(
      mockSong.spotifyURL.split(":")[2],
      mockPlaylists[0].playlist_id
    );
  });

  it("adds a song to a playlist, already in db", async () => {
    MockedSongReaderWriter.isSongInDB.mockResolvedValue(true);
    localStorage.setItem("current_user", "mockUserId");
    render(
      <BrowserRouter>
        <AddSongToPlaylistScreen />
      </BrowserRouter>
    );

    expect(PlaylistReaderWriter.getMyPlaylists).toHaveBeenCalled();

    const playlistDropdown = screen.getByRole("option");
    playlistDropdown.click();
    const playlistOption = await screen.findByText("My Playlist");
    playlistOption.click();

    const addSongButton = screen.getByTestId("add-song");
    await userEvent.click(addSongButton);

    expect(SongReaderWriter.isSongInDB).toHaveBeenCalledWith(
      mockSong.spotifyURL.split(":")[2]
    );
    expect(SongReaderWriter.addSongToDBFromSongCard).not.toHaveBeenCalledWith(
      mockSong
    );
    expect(RecordReaderWriter.addSongToRecords).toHaveBeenCalledWith(
      mockSong.spotifyURL.split(":")[2],
      mockPlaylists[0].playlist_id
    );
  });
});
