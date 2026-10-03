import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LyricsButton from "../../components/LyricsButton";
import { vi, describe, expect, it, afterEach } from "vitest";

describe("LyricsButton", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders "Open Lyrics" on desktop when lyrics are closed', () => {
    render(<LyricsButton isMobile={false} isLyricsOpen={false} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Open Lyrics" })).toBeInTheDocument();
  });

  it('renders "Close Lyrics" on desktop when lyrics are open', () => {
    render(<LyricsButton isMobile={false} isLyricsOpen={true} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Close Lyrics" })).toBeInTheDocument();
  });

  it('renders "Lyrics" on mobile when lyrics are closed', () => {
    render(<LyricsButton isMobile={true} isLyricsOpen={false} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Lyrics" })).toBeInTheDocument();
  });

  it('renders "Close" on mobile when lyrics are open', () => {
    render(<LyricsButton isMobile={true} isLyricsOpen={true} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<LyricsButton isMobile={false} isLyricsOpen={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies auto width style on mobile", () => {
    render(<LyricsButton isMobile={true} isLyricsOpen={false} onClick={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveStyle({ width: "auto" });
  });
});
