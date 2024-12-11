import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./index"; // Adjust path as needed

// Mocking the Button component if needed
vi.mock("../Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe("Card Component", () => {
  const mockProps = {
    title: "Inception",
    year: "2010",
    imdbID: "tt1375666",
    type: "movie",
    poster: "https://example.com/inception-poster.jpg",
  };

  it("should render the card component with correct props", () => {
    render(<Card {...mockProps} />);

    // Check if title is rendered
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    // Check if year and type are rendered
    expect(screen.getByText(mockProps.year)).toBeInTheDocument();
    expect(screen.getByText(mockProps.type)).toBeInTheDocument();

    // Check if IMDb ID is rendered inside the button
    expect(screen.getByText(mockProps.imdbID)).toBeInTheDocument();

    // Check if the poster image is rendered
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProps.poster);
  });

  it("should call window.open when the IMDb button is clicked", () => {
    // Mock window.open using vi.fn()
    const mockWindowOpen = vi.fn();
    window.open = mockWindowOpen; // Assign the mock to window.open

    render(<Card {...mockProps} />);

    // Find the IMDb button and click it
    const imdbButton = screen.getByText(mockProps.imdbID);
    fireEvent.click(imdbButton);

    // Assert that window.open was called with the correct URL
    expect(mockWindowOpen).toHaveBeenCalledWith(
      `https://www.imdb.com/title/${mockProps.imdbID}/`,
      "_blank"
    );
  });

  it('should render IMDb logo inside button', () => {
    render(<Card {...mockProps} />);
  
    // Check if the IMDb logo is rendered inside the button
    const imdbLogo = screen.getByTestId("imdb-logo");  // Assuming you add a testId in the component
  
    expect(imdbLogo).toBeInTheDocument();
  });

  it("should render poster image with correct src", () => {
    render(<Card {...mockProps} />);

    // Check if the poster image is rendered with the correct src
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProps.poster);
  });

  it("should render correct movie details", () => {
    render(<Card {...mockProps} />);

    // Check if movie details (title, year, type) are rendered correctly
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.year)).toBeInTheDocument();
    expect(screen.getByText(mockProps.type)).toBeInTheDocument();
  });
});
