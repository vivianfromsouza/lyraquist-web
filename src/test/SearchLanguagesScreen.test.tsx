import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchLanguage from "../screens/SearchLanguageScreen";

describe("Search Languages", () => {
  it("renders Search Languages Screen", () => {
    render(
      <BrowserRouter>
        <SearchLanguage />
      </BrowserRouter>
    );
    expect(page.getByLabelText("Spanish")).toBeInTheDocument();
    expect(page.getByLabelText("French")).toBeInTheDocument();
    expect(page.getByLabelText("German")).toBeInTheDocument();
  });
});
