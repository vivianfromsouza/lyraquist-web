import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// Mock Firebase modules to avoid real initialization
vi.mock("firebase/auth", () => {
  const mockAuth = {
    onAuthStateChanged: vi.fn((cb: (user: unknown) => void) => {
      cb({ uid: "mockUid", email: "test@example.com" });
      return () => {};
    }),
  };
  return {
    getAuth: vi.fn(() => mockAuth),
    signOut: vi.fn(() => Promise.resolve()),
    deleteUser: vi.fn(() => Promise.resolve()),
    // Add other exports as needed
  };
});

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  onValue: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  push: vi.fn(),
  // Add other exports as needed
}));

vi.mock("../services/firebase/LocalFirebaseClient", () => ({
  default: {},
}));

vi.mock("../services/firebase/FirebaseContext", () => {
  let currentUser: unknown = null;
  return {
    FirebaseProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useFirebase: () => ({ currentUser }),
    __setMockCurrentUser: (user: unknown) => {
      currentUser = user;
    },
  };
});

vi.mock("../services/LanguageReaderWriter", () => {
  const getLanguagesMock = vi.fn();
  return {
    default: {
      getLanguages: getLanguagesMock,
    },
    __getLanguagesMock: getLanguagesMock,
  };
});

// if LanguageScreen renders a language card component, stub it
vi.mock("../components/LanguageCard", () => ({
  default: ({ language }: { language: unknown }) => (
    <div data-testid="language-card">{(language as { name: string }).name}</div>
  ),
}));

import LanguageScreen from "../screens/LanguageScreen";

describe("LanguageScreen", () => {
  beforeEach(async () => {
    vi.resetAllMocks();
    const firebaseContext = await import("../services/firebase/FirebaseContext");
    const fbCtx = firebaseContext as unknown as {
      __setMockCurrentUser: (user: { uid: string; email: string }) => void;
    };
    fbCtx.__setMockCurrentUser({ uid: "u1", email: "test@example.com" });
  });

  it("loads and displays languages", async () => {
    const languageReader = await import("../services/LanguageReaderWriter");
    const getLanguagesFn = languageReader.default.getLanguages as unknown as {
      mockResolvedValue: (value: unknown) => void;
    };
    getLanguagesFn.mockResolvedValue([
      { id: "de", name: "German" },
      { id: "fr", name: "French" },
      { id: "es", name: "Spanish" },
    ]);

    render(
      <MemoryRouter>
        <LanguageScreen albumId={'abc'} language={'Italian'} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("German")).toBeInTheDocument());

    expect(screen.getByText("German")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
  });

  it("shows empty state when no languages returned", async () => {
    const languageReader = await import("../services/LanguageReaderWriter");
    const getLanguagesFn = languageReader.default.getLanguages as unknown as {
      mockResolvedValue: (value: unknown) => void;
    };
    getLanguagesFn.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <LanguageScreen albumId={'abc'} language={'Italian'} />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/no languages/i) || screen.getByText(/nothing found/i)
      ).toBeInTheDocument()
    );
  });

  it("navigates to language detail when user selects a language", async () => {
    const languageReader = await import("../services/LanguageReaderWriter");
    const getLanguagesFn = languageReader.default.getLanguages as unknown as {
      mockResolvedValue: (value: unknown) => void;
    };
    getLanguagesFn.mockResolvedValue([{ id: "it", name: "Italian" }]);

    render(
      <MemoryRouter>
        <LanguageScreen albumId={'abc'} language={'Italian'} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId("language-card")).toBeInTheDocument());

    const card = screen.getByTestId("language-card");
    fireEvent.click(card);

    // if LanguageScreen uses <Link> with path /language/:id, this should be enough:
    expect(window.location.pathname).toContain("/language/it");
  });
});