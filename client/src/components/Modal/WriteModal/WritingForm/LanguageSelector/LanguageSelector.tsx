import React, { useCallback, ChangeEvent } from "react";
import { LANGUAGES } from "@/constants/options";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import useWritingStore from "@/store/useWritingStore";

const LanguageSelector = (): JSX.Element => {
  const { selectedLanguage, setLanguage } = useWritingStore((state) => ({
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
        {LANGUAGES.map((language, idx) => (
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
