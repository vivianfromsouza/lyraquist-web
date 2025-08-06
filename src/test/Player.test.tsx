import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Player from "../components/Player";
import { FirebaseProvider } from "../services/firebase/FirebaseContext";
import { PlayerProvider } from "../context/PlayerContext";
import { BrowserRouter } from "react-router-dom";

describe("Player", () => {
  it("renders Player component", () => {
    render(<Player />);
    <FirebaseProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Player />
        </BrowserRouter>
      </PlayerProvider>
    </FirebaseProvider>;
  });
});
