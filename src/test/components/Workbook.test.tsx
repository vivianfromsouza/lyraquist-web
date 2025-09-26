import { fireEvent, render, screen } from "@testing-library/react";
import Workbook from "../../components/Workbook";
import { vi, describe, expect, it, beforeAll, afterEach } from "vitest";
import { userEvent } from "@vitest/browser/context";

const mockPlaySong = vi.fn();

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "mocked-app" })),
  getApps: vi.fn(() => [{ name: "mocked-app" }]),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: "mockUserId" },
    signOut: vi.fn(),
  })),
  onAuthStateChanged: vi.fn(),
  deleteUser: vi.fn(),
  verifyBeforeUpdateEmail: vi.fn(),
}));

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  update: vi.fn(),
  onValue: vi.fn(),
}));

vi.mock("../services/firebase/LocalFirebaseClient", () => ({
  __esModule: true,
  default: { name: "mocked-app" },
}));

vi.mock("../context/PlayerContext", async () => {
  const actual = await vi.importActual<any>("../context/PlayerContext");
  return {
    ...actual,
    usePlayer: () => ({
      playSong: mockPlaySong,
      playPlaylist: vi.fn(),
      pausePlayback: vi.fn(),
      isPaused: false,
      isActive: true,
      currentTrack: null,
    }),
  };
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockWorkbook = {
  name: "Test Workbook",
};

describe("Workbook", () => {
  beforeAll(() => {
    render(<Workbook item={mockWorkbook} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Workbook", () => {
    expect(screen.getByText("Test Workbook")).toBeInTheDocument();
    expect(screen.getByTestId("workbook-icon")).toBeInTheDocument();
  });

  it("goes to workbook screen", async () => {
    const workbookButton = screen.getByTestId("workbook-icon");
    await userEvent.click(workbookButton);
    expect(mockNavigate).toHaveBeenCalledWith("/workbook/info", {
      state: {
        name: "Test Workbook",
      },
    });
  });
});
