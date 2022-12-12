import React, { useCallback, ChangeEvent } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import { LANGUAGES } from "@/constants/options";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";
import { useSnapshotCodeBlock } from "@/hooks/useSnapshotCodeBlock";
import { getLineCount } from "@/utils/code";
import { wait } from "@/utils/async";

import "./LanguageSelector.scss";

const LanguageSelector = (): JSX.Element => {
  const { selectedLanguage, setLanguage, code, resetImages } =
    useCodeEditorStore((state) => ({
      selectedLanguage: state.language,
      setLanguage: state.setLanguage,
      images: state.images,
      code: state.code,
      resetImages: state.resetImages,
    }));
  const { snapshotCodeBlock } = useSnapshotCodeBlock();
  const selectLanguage = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    const requiredSnapshotCount = Math.floor(
      (getLineCount(code) - 1) / ONE_SNAPSHOT_LINE_COUNT
    );
    resetImages();
    // images 배열이 완벽히 비어지고 highlighting 될 때를 기다려야한다.
    void (async () => {
      await wait(1000);
      for (let idx = 1; idx <= requiredSnapshotCount; idx++)
        await snapshotCodeBlock(idx);
    })();
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
