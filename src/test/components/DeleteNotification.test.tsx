import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { vi, describe, it, afterEach, expect } from "vitest";
import DeleteNotification from "../../components/DeleteNotification";

describe("DeleteNotification", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the confirmation message", () => {
    render(
      <DeleteNotification name="playlist" closeToast={vi.fn()} deleteFunction={vi.fn()} />
    );
    expect(
      screen.getByText(
        "Are you Sure? Playlists are not retrievable once deleted."
      )
    ).toBeInTheDocument();
  });

  it("renders Cancel and Delete buttons", () => {
    render(
      <DeleteNotification name="playlist" closeToast={vi.fn()} deleteFunction={vi.fn()} />
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls closeToast when Cancel is clicked", async () => {
    const closeToast = vi.fn();
    render(
      <DeleteNotification name="playlist" closeToast={closeToast} deleteFunction={vi.fn()} />
    );
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(closeToast).toHaveBeenCalledTimes(1);
  });

  it("calls deleteFunction when Delete is clicked", async () => {
    const deleteFunction = vi.fn();
    render(
      <DeleteNotification name="playlist" closeToast={vi.fn()} deleteFunction={deleteFunction} />
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(deleteFunction).toHaveBeenCalledTimes(1);
  });
});
