import React from "react";
import { useLanguageButton } from "./useLanguageButton";

import './styles.css'

const LanguageButton: React.FC= () => {
  const { changeLanguageTo, currentLanguage, isOpen, supportedLanguages, toggleIsOpen } = useLanguageButton()
  return (
    <div className="language-switcher">
      <button className="language-button" onClick={() => toggleIsOpen()}>
        {currentLanguage.label}
      </button>

      {isOpen && (
        <div className="language-menu">
          {supportedLanguages.map((lang) => (
            <button key={lang.code} className="language-option" onClick={() => changeLanguageTo(lang.code)}>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
