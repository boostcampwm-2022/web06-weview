import React, { FormEvent, useCallback } from "react";

import useWritingModalStore from "@/store/useWritingModalStore";
import LanguageSelector from "@/components/main/Modal/WriteModal/WritingForm/LanguageSelector/LanguageSelector";
import CodeEditor from "@/components/main/CodeEditor/CodeEditor";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";
import { getLineCount } from "@/utils/code";
import { useSnapshotCodeBlock } from "@/hooks/useSnapshotCodeBlock";

import SubmitButton from "./SubmitButton/SubmitButton";

import "./WritingForm.scss";

const WritingForm = (): JSX.Element => {
  const { openSubmitModal } = useWritingModalStore((state) => ({
    openSubmitModal: state.openSubmitModal,
  }));
  const { images, code } = useCodeEditorStore((state) => ({
    images: state.images,
    code: state.code,
  }));
  const { snapshotCodeBlock } = useSnapshotCodeBlock();
  const submitWritings = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      /* 스냅샷 되지 않은 부분이 있다면 스냅샷 */
      void (async () => {
        if (images.length < (getLineCount(code) - 1) / ONE_SNAPSHOT_LINE_COUNT)
          console.log(images.length);
        await snapshotCodeBlock(images.length + 1);
        console.log();
      })();
      openSubmitModal();
    },
    [images]
  );

  return (
    <form onSubmit={submitWritings} className="writing-form">
      <LanguageSelector />
      <CodeEditor />
      <div className="writing-form__buttons">
        {/* <PrettifyButton /> */}
        <SubmitButton />
      </div>
    </form>
  );
};

export default WritingForm;
