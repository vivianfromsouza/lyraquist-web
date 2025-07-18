import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Player from "../components/Player";

describe("Player", () => {
  it("renders Player component", () => {
    render(<Player />);
    // expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});
