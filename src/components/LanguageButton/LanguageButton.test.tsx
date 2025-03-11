import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageButton from "../LanguageButton";
import { useLanguageButton } from "./useLanguageButton";

jest.mock("./useLanguageButton");

describe("LanguageButton - How does the menu behave?", () => {
  test("opens when clicking the button", () => {
    const mockToggleIsOpen = jest.fn();

    (useLanguageButton as jest.Mock).mockReturnValue({
      changeLanguageTo: jest.fn(),
      currentLanguage: { code: "en", label: "🇬🇧 English" },
      isOpen: false,
      supportedLanguages: [
        { code: "en", label: "🇬🇧 English" },
        { code: "es", label: "🇪🇸 Español" }
      ],
      toggleIsOpen: mockToggleIsOpen,
    });

    render(<LanguageButton />);
    fireEvent.click(screen.getByRole("button", { name: "🇬🇧 English" }));

    expect(mockToggleIsOpen).toHaveBeenCalled();
  });

  test("closes the menu and switches language when clicking an option", () => {
    const mockChangeLanguageTo = jest.fn();

    (useLanguageButton as jest.Mock).mockReturnValue({
      changeLanguageTo: mockChangeLanguageTo,
      currentLanguage: { code: "en", label: "🇬🇧 English" },
      isOpen: true, // Menu is open
      supportedLanguages: [
        { code: "en", label: "🇬🇧 English" },
        { code: "es", label: "🇪🇸 Español" }
      ],
      toggleIsOpen: jest.fn(),
    });

    render(<LanguageButton />);
    fireEvent.click(screen.getByRole("button", { name: "🇪🇸 Español" }));

    expect(mockChangeLanguageTo).toHaveBeenCalledWith("es");
  });

  test("shows language options when menu is open", () => {
    (useLanguageButton as jest.Mock).mockReturnValue({
      changeLanguageTo: jest.fn(),
      currentLanguage: { code: "en", label: "🇬🇧 English" },
      isOpen: true, // Menu is open
      supportedLanguages: [
        { code: "en", label: "🇬🇧 English" },
        { code: "es", label: "🇪🇸 Español" }
      ],
      toggleIsOpen: jest.fn(),
    });

    render(<LanguageButton />);
    
    expect(screen.getByRole("button", { name: "🇪🇸 Español" })).toBeInTheDocument();
  });
});

describe("LanguageButton - What shows up?", () => {
  test("displays the current language on the button", () => {
    (useLanguageButton as jest.Mock).mockReturnValue({
      changeLanguageTo: jest.fn(),
      currentLanguage: { code: "en", label: "🇬🇧 English" },
      isOpen: false,
      supportedLanguages: [
        { code: "en", label: "🇬🇧 English" },
        { code: "es", label: "🇪🇸 Español" }
      ],
      toggleIsOpen: jest.fn(),
    });

    render(<LanguageButton />);
    expect(screen.getByRole("button", { name: "🇬🇧 English" })).toBeInTheDocument();
  });
});
