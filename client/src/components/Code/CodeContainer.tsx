import React, { createContext } from "react";
import useWritingStore from "@/store/useWritingStore";
import { CodeInfo, CodeStore } from "@/types/post";
import { defaultCodeInfo } from "@/constants/defaultObject";
import CodePresenter from "@/components/Code/CodePresenter";

interface CodeProps {
  codeStore?: CodeStore;
  isEditable?: boolean;
}

export const CodeContext = createContext<CodeInfo>(defaultCodeInfo);

const CodeContainer = ({
  codeStore,
  isEditable = false,
}: CodeProps): JSX.Element => {
  if (codeStore === undefined) {
    codeStore = useWritingStore((state) => ({
      code: state.code,
      setCode: state.setCode,
      language: state.language,
    }));
  }

  return (
    <CodeContext.Provider value={{ ...codeStore, isEditable }}>
      <CodePresenter />
    </CodeContext.Provider>
  );
};

export default CodeContainer;
