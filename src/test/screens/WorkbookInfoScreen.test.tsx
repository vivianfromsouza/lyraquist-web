import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import { render, cleanup, screen } from "@testing-library/react";
import WorkbookInfoScreen from "../../screens/WorkbookInfoScreen";

const mockWords = [{ word: "test", word_id: "1" }];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: "/workbook/info",
      state: {
        name: "Test Workbook",
        book_id: "12345",
        description: "This is a test workbook",
      },
    }),
  };
});

vi.mock("../../services/WordReaderWriter", () => ({
  default: {
    getAllWordsFromWorkbook: vi.fn(() =>
      Promise.resolve([
        { word: "test", word_id: "1" },
        { word: "apple", word_id: "2" },
        { word: "banana", word_id: "3" },
      ])
    ),
  },
}));

describe("WorkbookInfo", () => {
  beforeEach(() => {
    render(<WorkbookInfoScreen />);
  });
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("renders WorkbookInfo Screen", () => {
    expect(page.getByTestId("workbook-title")).toBeInTheDocument();
    expect(page.getByTestId("workbook-description")).toBeInTheDocument();
    expect(page.getByTestId("search-input")).toBeInTheDocument();
    expect(page.getByTestId("add-word")).toBeInTheDocument();
    expect(page.getByTestId("flashcards-button")).toBeInTheDocument();
  });
  it("deletes the workbook", async () => {
    const deleteButton = page.getByTestId("delete-icon");
    await deleteButton.click();
  });
  it("searches the workbook", async () => {
    const search = page.getByTestId("search-input");
    await userEvent.click(search);
    await userEvent.type(search, "apple");
    const wordElement = page.getByTestId("word");
    expect(wordElement).toHaveTextContent("apple");
  });
  it("hits add new word button", async () => {
    const addWordButton = page.getByTestId("add-word");
    await userEvent.click(addWordButton);
    expect(page.getByText("New Word")).toBeInTheDocument();
  });
  it("hits open flashcards", async () => {
    const openCardsButton = page.getByTestId("flashcards-button");
    await userEvent.click(openCardsButton);
    const flashcards = await screen.findAllByTestId("flashcard");
    expect(flashcards).toHaveLength(3);
  });
});
