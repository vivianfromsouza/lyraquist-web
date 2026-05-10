import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import LyricsPanel from "../../components/LyricsPanel";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";

vi.mock("../components/WordModal", () => ({
  default: ({ openModal, word, songLang, songName }) =>
    openModal ? (
      <div data-testid="word-modal">
        Mock WordModal: {word} in {songLang} for {songName}
      </div>
    ) : null,
}));

const mockCurrentTrack = {
  name: "Test Song",
  artist: "Test Artist",
  imageURL: "https://picsum.photos/536/354",
  album: "Test Album",
  duration: 123456,
  spotifyURL: "spotify:track:123",
};

const mockLyrics = "these are the mock lyrics\nline two words";
const mockFromLang = "en";

describe("LyricsPanel", () => {
  beforeEach(() => {
    render(
      <LyricsPanel
        lyrics={mockLyrics}
        songLang={mockFromLang}
        currentTrack={mockCurrentTrack}
      />,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders lyrics words", () => {
    expect(screen.getByText("these")).toBeInTheDocument();
    expect(screen.getByText("are")).toBeInTheDocument();
    expect(screen.getByText("the")).toBeInTheDocument();
    expect(screen.getByText("mock")).toBeInTheDocument();
    expect(screen.getByText("lyrics")).toBeInTheDocument();
    expect(screen.getByText("line")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getByText("words")).toBeInTheDocument();
  });

  it("opens WordModal when a word is pressed", () => {
    const wordElement = screen.getByText("these");
    fireEvent.click(wordElement);

    expect(screen.getAllByRole("presentation")).toHaveLength(2);
    expect(screen.getAllByText("these")).toHaveLength(2);
  });

  it("trims punctuation from clicked word", () => {
    // Add a word with punctuation to the mock
    const lyricsWithPunc = "these, are! the (mock) lyrics";
    render(
      <LyricsPanel
        lyrics={lyricsWithPunc}
        songLang={mockFromLang}
        currentTrack={mockCurrentTrack}
      />,
    );

    const wordElement = screen.getByText("these,");
    fireEvent.click(wordElement);

    expect(screen.getAllByRole("presentation")).toHaveLength(2);
    expect(screen.getAllByText("these")).toHaveLength(2);
  });

  it("does not render WordModal initially", () => {
    expect(screen.queryByTestId("word-modal")).not.toBeInTheDocument();
  });
});
