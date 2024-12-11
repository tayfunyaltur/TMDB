import Button from "./index";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("should render with default class (primary and xs)", () => {
    render(<Button onClick={() => {}}>Default Button</Button>);
    const button = screen.getByText("Default Button");
    expect(button).toHaveClass("button button-primary button-xs");
  });

  it("should render with primary type and sm size", () => {
    render(
      <Button type="primary" size="sm" onClick={() => {}}>
        Primary Small Button
      </Button>
    );
    const button = screen.getByText("Primary Small Button");
    expect(button).toHaveClass("button button-primary button-sm");
  });

  it("should render with secondary type and lg size", () => {
    render(
      <Button type="secondary" size="lg" onClick={() => {}}>
        Secondary Large Button
      </Button>
    );
    const button = screen.getByText("Secondary Large Button");
    expect(button).toHaveClass("button button-secondary button-lg");
  });

  it("should render with ghost type and md size", () => {
    render(
      <Button type="ghost" size="md" onClick={() => {}}>
        Ghost Medium Button
      </Button>
    );
    const button = screen.getByText("Ghost Medium Button");
    expect(button).toHaveClass("button button-ghost button-md");
  });

  it("should render children correctly", () => {
    render(<Button onClick={() => {}}>Test Button</Button>);
    const button = screen.getByText("Test Button");
    expect(button).toBeInTheDocument();
  });

  it("should apply default size if no size is passed", () => {
    render(
      <Button type="primary" onClick={() => {}}>
        Button with Default Size
      </Button>
    );
    const button = screen.getByText("Button with Default Size");
    expect(button).toHaveClass("button button-primary button-xs"); // Default size should be 'xs'
  });

  it("should apply default type if no type is passed", () => {
    render(
      <Button size="lg" onClick={() => {}}>
        Button with Default Type
      </Button>
    );
    const button = screen.getByText("Button with Default Type");
    expect(button).toHaveClass("button button-primary button-lg"); // Default type should be 'primary'
  });

  it("should call the onClick handler when clicked", () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const button = screen.getByText("Click Me");

    fireEvent.click(button);

    // Check if onClick was called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should prevent default behavior on click", () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const button = screen.getByText("Click Me");

    fireEvent.click(button);

    // Check if preventDefault was called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
