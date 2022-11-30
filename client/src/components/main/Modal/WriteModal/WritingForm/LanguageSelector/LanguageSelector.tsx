import React, { useCallback, ChangeEvent } from "react";
import "./LanguageSelector.scss";
import { LANGUAGES } from "@/constants/options";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import useCodeEditorStore from "@/store/useCodeEditorStore";

const LanguageSelector = (): JSX.Element => {
  const { selectedLanguage, setLanguage } = useCodeEditorStore((state) => ({
    selectedLanguage: state.language,
    setLanguage: state.setLanguage,
  }));
  const selectLanguage = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  }, []);

  return (
    <div className="language">
      <select
        onChange={selectLanguage}
        className="language__select"
        value={selectedLanguage}
      >
        {LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      <ArrowDropDownOutlinedIcon className="language__icon" />
    </div>
  );
};

export default LanguageSelector;
