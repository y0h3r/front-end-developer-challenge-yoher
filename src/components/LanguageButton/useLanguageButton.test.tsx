import { renderHook, act } from "@testing-library/react";
import { useLanguageButton } from "./useLanguageButton";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
      changeLanguage: jest.fn(),
    },
  }),
}));

describe("useLanguageButton - Initial State", () => {
  test("starts with English as the default language and dropdown closed", () => {
    const { result } = renderHook(() => useLanguageButton());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentLanguage).toEqual({ code: "en", label: "🇬🇧 English" });
    expect(result.current.supportedLanguages.length).toBe(2);
  });
});

describe("useLanguageButton - Dropdown Behavior", () => {
  test("opens and closes the dropdown when toggled", () => {
    const { result } = renderHook(() => useLanguageButton());

    act(() => {
      result.current.toggleIsOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleIsOpen();
    });

    expect(result.current.isOpen).toBe(false);
  });
});

describe("useLanguageButton - Language Switching", () => {
  test("changes language and closes the dropdown", () => {
    const { result } = renderHook(() => useLanguageButton());

    act(() => {
      result.current.changeLanguageTo("es");
    });

    expect(result.current.isOpen).toBe(false);
  });
});
