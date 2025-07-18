import { describe, it, expect } from "vitest";
import { page } from '@vitest/browser/context'
import { render } from "@testing-library/react";
import { Home } from "react-ionicons";

describe("Home", () => {
  it("renders Home component", () => {
    render(<Home />);
    expect(page.getByText('Hello')).toBeInTheDocument();
  });
});
