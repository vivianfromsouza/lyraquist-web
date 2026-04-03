import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// firebase context mock: keeps local user state and exposes setter
vi.mock("../services/firebase/FirebaseContext", () => {
  let currentUser: any = null;
  return {
    FirebaseProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useFirebase: () => ({ currentUser }),
    __setMockCurrentUser: (user: any) => {
      currentUser = user;
    },
  };
});

// other service mocks
vi.mock("../services/UserReaderWriter", () => ({
  default: { getUserName: vi.fn(() => Promise.resolve("TestUser")) },
}));
vi.mock("../services/LanguageReaderWriter", () => ({
  default: { getLanguages: vi.fn(() => Promise.resolve([])) },
}));
vi.mock("../services/HistoryReaderWriter", () => ({
  default: { getUserHistory: vi.fn(() => Promise.resolve([])) },
}));
vi.mock("../services/PlaylistReaderWriter", () => ({
  default: { getMyPlaylists: vi.fn(() => Promise.resolve([])) },
}));
vi.mock("../services/RecordReaderWriter", () => ({
  default: { getMySongs: vi.fn(() => Promise.resolve([])) },
}));
vi.mock("../services/WorkbookReaderWriter", () => ({
  default: { getWorkbooks: vi.fn(() => Promise.resolve([])) },
}));
vi.mock("../services/LocalSupabaseClient", () => {
  const subscribe = vi.fn(() => ({ subscribe }));
  const on = vi.fn(() => ({ subscribe }));
  const channel = vi.fn(() => ({ on, subscribe }));
  return { default: { channel } };
});
vi.mock("../components/Song", () => ({ default: () => <div>SONG</div> }));
vi.mock("../components/Playlist", () => ({ default: () => <div>PLAYLIST</div> }));
vi.mock("../components/Workbook", () => ({ default: () => <div>WORKBOOK</div> }));
vi.mock("../components/StarredLang", () => ({ default: () => <div>STARRED</div> }));

import HomeScreen from "../screens/HomeScreen";
import { __setMockCurrentUser } from "../services/firebase/FirebaseContext";

describe("HomeScreen", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    __setMockCurrentUser(null);
  });

  it("shows loading indicator when there is no currentUser", async () => {
    __setMockCurrentUser(null);

    render(
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Hello,")).not.toBeInTheDocument();
      expect(screen.queryByText("TestUser!")).not.toBeInTheDocument();
    });
  });

  it("shows home content when currentUser exists", async () => {
    __setMockCurrentUser({ uid: "u1", email: "test@example.com" });

    render(
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Hello,")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("TestUser!")).toBeInTheDocument());

    expect(screen.getByText("No History Yet... Start Listening Now!")).toBeInTheDocument();
    expect(screen.getByText("No Playlists Yet...")).toBeInTheDocument();
    expect(screen.getByText("No Saved Songs Yet...")).toBeInTheDocument();
    expect(screen.getByText("No Current Workbooks")).toBeInTheDocument();
  });
});