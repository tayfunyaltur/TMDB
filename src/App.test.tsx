import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Link } from "react-router-dom";
import App from "./App";

// Mocking the Movies and Movie components to focus on routing tests
vi.mock("./pages/Movies", () => ({
  default: () => (
    <div>
      <div>Movies Page</div>
      <Link to="/movie/1">Change To 1</Link>
    </div>
  ),
}));

vi.mock("./pages/Movie", () => ({
  default: () => <Link to="/movie/1">Movie Page</Link>,
}));

describe("App Component", () => {
  it("should render Movies component at the root path '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // The Movies component should be displayed when at the root path '/'
    expect(screen.getByText("Movies Page")).toBeInTheDocument();
  });

  it("should render Movie component at the '/movie/:id' path", async () => {
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <App />
      </MemoryRouter>
    );

    // Wait for the Movie page to render after navigating to /movie/1
    await waitFor(() =>
      expect(screen.getByText("Movie Page")).toBeInTheDocument()
    );
  });

  it("should navigate between Movies and Movie pages", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // First, the Movies page should render at the root
    expect(screen.getByText("Movies Page")).toBeInTheDocument();

    // Simulate navigation to the Movie page
    fireEvent.click(screen.getByText("Change To 1"));

    // Wait for the Movie page to render after navigation
    await waitFor(() =>
      expect(screen.getByText("Movie Page")).toBeInTheDocument()
    );
  });
});
