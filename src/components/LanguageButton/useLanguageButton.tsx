import { useState } from "react";
import { useTranslation } from "react-i18next";

type Language = {
  code: string;
  label: string;
};

const supportedLanguages: Language[] = [
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
];

export const useLanguageButton = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentLanguage: Language =
    supportedLanguages.find((lang) => lang.code === i18n.language) || supportedLanguages[0];

  const changeLanguageTo = (lng: string): void => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    changeLanguageTo,
    toggleIsOpen,
    isOpen,
    currentLanguage,
    supportedLanguages,
  };
};
