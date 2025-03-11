import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Icon from "../Icon";

describe("Icon Component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with default props", () => {
    render(<Icon name="stack" onClick={mockOnClick} />);

    const sut = screen.getByRole("button");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveClass("icon");
  });

  test("applies glow class when status is active", () => {
    render(<Icon name="stack" status="active" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveClass("glow");
  });

  test("renders with the correct size", () => {
    render(<Icon name="stack" size={60} onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveStyle({ width: "60px", height: "60px" });
  });

  test("calls onClick when clicked with left mouse button", () => {
    render(<Icon name="fork" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    fireEvent.mouseDown(sut, { button: 0 });

    expect(mockOnClick).toHaveBeenCalledWith({ left: true, right: false });
  });

  test("calls onClick when clicked with right mouse button", () => {
    render(<Icon name="cake" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    fireEvent.mouseDown(sut, { button: 2 });

    expect(mockOnClick).toHaveBeenCalledWith({ left: false, right: true });
  });

  test("applies correct background position based on name and status", () => {
    render(<Icon name="ship" status="inactive" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveStyle({
      backgroundPosition: "-200px -50px",
    });
  });
});
