import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TranslationPanel from "../../components/TranslationPanel";
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

const mockTranslation = "estas son las letras simuladas\nlínea dos palabras";
const mockPrefLang = "es";

describe("TranslationPanel", () => {
  beforeEach(() => {
    render(
      <TranslationPanel
        translation={mockTranslation}
        prefLang={mockPrefLang}
        currentTrack={mockCurrentTrack}
      />,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders translation words", () => {
    expect(screen.getByText("estas")).toBeInTheDocument();
    expect(screen.getByText("son")).toBeInTheDocument();
    expect(screen.getByText("letras")).toBeInTheDocument();
    expect(screen.getByText("simuladas")).toBeInTheDocument();
    expect(screen.getByText("línea")).toBeInTheDocument();
    expect(screen.getByText("dos")).toBeInTheDocument();
    expect(screen.getByText("palabras")).toBeInTheDocument();
  });

  it("opens WordModal when a word is pressed", () => {
    const wordElement = screen.getByText("estas");
    fireEvent.click(wordElement);

    expect(screen.getAllByRole("presentation")).toHaveLength(2);
    expect(screen.getAllByText("estas")).toHaveLength(2);
  });

  it("trims punctuation from clicked word", () => {
    // Add a word with punctuation to the mock
    const translationWithPunc = "estas, son! las (letras) simuladas";
    render(
      <TranslationPanel
        translation={translationWithPunc}
        prefLang={mockPrefLang}
        currentTrack={mockCurrentTrack}
      />,
    );

    const wordElement = screen.getByText("estas,");
    fireEvent.click(wordElement);

    expect(screen.getAllByRole("presentation")).toHaveLength(2);
    expect(screen.getAllByText("estas")).toHaveLength(2);
  });

  it("does not render WordModal initially", () => {
    expect(screen.queryByTestId("word-modal")).not.toBeInTheDocument();
  });
});
