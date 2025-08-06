import { describe, it, expect } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TranslateScreen from "../screens/TranslateScreen";


describe("Translation", () => {
  it("renders Translation Screen", () => {
    render(
      <BrowserRouter>
        <TranslateScreen />
      </BrowserRouter>
    );
    expect(page.getByText("LOADING...")).toBeInTheDocument();
  });
});
