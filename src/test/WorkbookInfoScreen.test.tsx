import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import WorkbookInfoScreen from "../screens/WorkbookInfoScreen";
import { BrowserRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      pathname: "/workbook/info",
      state: { workbookId: "mockWorkbookId", /* add other mock state as needed */ },
    }),
  };
});

describe("Workbook", () => {
  it("renders Workbook component", () => {
    render(
      <BrowserRouter>
        <WorkbookInfoScreen />
      </BrowserRouter>
    );
    expect(page.getByText("Open Flashcards")).toBeInTheDocument();
  });
});
