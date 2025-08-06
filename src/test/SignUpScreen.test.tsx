import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpScreen from "../screens/SignUpScreen";

describe("SignUp", () => {
  it("renders SignUp Screen", () => {
    render(
      <BrowserRouter>
        <SignUpScreen />
      </BrowserRouter>
    );
    expect(page.getByText("Set up your profile")).toBeInTheDocument();

  });
});
