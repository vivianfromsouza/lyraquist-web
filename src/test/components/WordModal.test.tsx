import { render, screen, waitFor, cleanup } from "@testing-library/react";
import WordModal from "../../components/WordModal";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import TranslationService from "../../services/TranslationService";

vi.mock("../../services/UserReaderWriter", () => ({
  __esModule: true,
  default: {
    getPreferredLanguage: vi.fn(() => Promise.resolve("es")),
    getTargetLanguage: vi.fn(() => Promise.resolve("en")),
  },
}));

vi.mock("../../services/TranslationService", () => ({
  __esModule: true,
  default: {
    getIndividualTranslation: vi.fn(() =>
      Promise.resolve({
        data: [{ translations: [{ posTag: "noun" }] }],
      }),
    ),
    lexicalaDefinition: vi.fn(() => Promise.resolve({ results: [] })),
  },
}));

vi.mock("../../services/DictionaryService", () => ({
  __esModule: true,
  default: {
    getDefinition: vi.fn(() =>
      Promise.resolve({
        results: [
          {
            lexicalEntries: [
              {
                entries: [
                  {
                    senses: [{ definitions: ["mock definition"] }],
                  },
                ],
                lexicalCategory: { text: "noun" },
              },
            ],
          },
        ],
      }),
    ),
  },
}));

vi.mock("../../services/WorkbookReaderWriter", () => ({
  __esModule: true,
  default: {
    getWorkbooks: vi.fn(() =>
      Promise.resolve([{ name: "Test Workbook", book_id: "123" }]),
    ),
    createWorkbook: vi.fn(() => Promise.resolve("new-book-id")),
  },
}));

vi.mock("../../services/WordReaderWriter", () => ({
  __esModule: true,
  default: {
    addWord: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => null,
}));

vi.mock("react-native-dropdown-picker", () => ({
  __esModule: true,
  default: ({ open, items, setOpen, setValue }) => (
    <div data-testid="dropdown">
      <button onClick={() => setOpen(!open)}>Toggle Dropdown</button>
      {open && (
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => setValue(item.value)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  ),
}));

const mockProps = {
  openModal: true,
  setOpenModal: vi.fn(),
  word: "test",
  fromLang: "en",
  toLang: "es",
  songName: "Test Song",
};

describe("WordModal", () => {
  beforeEach(async () => {
    render(<WordModal {...mockProps} />);
    // Wait for async operations
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the modal when openModal is true", () => {
    expect(screen.getAllByRole("presentation")).toHaveLength(2);
  });

  it("displays the word", () => {
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("loads workbooks for dropdown", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    });
  });

  it("calls services on mount", async () => {
    await waitFor(() => {
      expect(TranslationService.getIndividualTranslation).toHaveBeenCalledWith(
        "test",
        "en",
        "es",
      );
    });
  });
});
