import React from "react";
import { LANGUAGES } from "@/constants/options";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const LanguageSelector = (): JSX.Element => {
  return (
    <div className="language">
      <select className="language__select">
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
