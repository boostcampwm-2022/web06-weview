import React from "react";
import { LANGUAGES } from "@/constants/options";
import { IntegrationInstructionsOutlined } from "@mui/icons-material";

const LanguageSelector = (): JSX.Element => {
  return (
    <div className="language">
      <IntegrationInstructionsOutlined className="language__icon" />
      <select className="language__select">
        {LANGUAGES.map((language, idx) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
