import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Icon from "../Icon";

describe("Icon shows up and behaves correctly", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders just fine with default props", () => {
    render(<Icon name="stack" onClick={mockOnClick} />);

    const sut = screen.getByRole("button");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveClass("icon");
  });

  test("lights up when active", () => {
    render(<Icon name="stack" status="active" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveClass("glow");
  });

  test("respects custom size", () => {
    render(<Icon name="stack" size={60} onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveStyle({ width: "60px", height: "60px" });
  });
});

describe("Icon handles clicks properly", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("detects left-click", () => {
    render(<Icon name="fork" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    fireEvent.mouseDown(sut, { button: 0 });

    expect(mockOnClick).toHaveBeenCalledWith({ left: true, right: false });
  });

  test("detects right-click", () => {
    render(<Icon name="cake" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    fireEvent.mouseDown(sut, { button: 2 });

    expect(mockOnClick).toHaveBeenCalledWith({ left: false, right: true });
  });
});

describe("Icon styling works as expected", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("applies correct background position based on name and status", () => {
    render(<Icon name="ship" status="inactive" onClick={mockOnClick} />);
    const sut = screen.getByRole("button");

    expect(sut).toHaveStyle({
      backgroundPosition: "-200px -50px",
    });
  });
});
