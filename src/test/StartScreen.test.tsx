import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import StartScreen from "../screens/StartScreen";

describe("Start", () => {
  it("renders Start Screen", () => {
    render(
      <BrowserRouter>
        <StartScreen />
      </BrowserRouter>
    );
    expect(page.getByText("Lyraquist")).toBeInTheDocument();
    expect(page.getByLabelText("loginClick")).toBeInTheDocument();
        expect(page.getByLabelText("signupClick")).toBeInTheDocument();

  });
});
