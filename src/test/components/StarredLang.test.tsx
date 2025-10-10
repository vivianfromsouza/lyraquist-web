import { render, screen } from "@testing-library/react";
import StarredLang from "../../components/StarredLang";
import { vi, describe, expect, it, beforeAll, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import LanguageReaderWriter from "../../services/LanguageReaderWriter";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/LanguageReaderWriter", () => {
  return {
    default: {
      deleteLangauge: vi.fn(),
    },
  };
});

describe("StarredLang", () => {
  beforeAll(() => {
    render(<StarredLang value={"English"} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Starred Lang", () => {
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("calls deleteLangauge when star icon is pressed", async () => {
    const starIcon = screen.getByTestId("star-icon");
    await userEvent.click(starIcon);
    expect(LanguageReaderWriter.deleteLangauge).toHaveBeenCalledWith("English");
  });

    it("goes to the language page when clicked", async () => {
    const langLink = screen.getByTestId("go-to-lang");
    await userEvent.click(langLink);
    expect(mockNavigate).toHaveBeenCalledWith("/language/english");
  });
});
