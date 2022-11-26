import React, { createContext } from "react";
import useWritingStore from "@/store/useWritingStore";
import { CodeInfo } from "@/types/post";
import { defaultCodeInfo } from "@/constants/defaultObject";
import CodePresenter from "@/components/Code/CodePresenter";

interface CodeProps {
  code?: string;
  language?: string;
  isEditable?: boolean;
  setCode?: ((code: string) => void) | null;
}

export const CodeContext = createContext<CodeInfo>(defaultCodeInfo);

const CodeContainer = ({
  code,
  setCode,
  language,
  isEditable = false,
}: CodeProps): JSX.Element => {
  if (code === undefined || language === undefined || setCode === undefined) {
    ({ code, language, setCode } = useWritingStore((state) => ({
      code: state.code,
      setCode: state.setCode,
      language: state.language,
    })));
  }

  return (
    <CodeContext.Provider value={{ code, language, isEditable, setCode }}>
      <CodePresenter />
    </CodeContext.Provider>
  );
};

export default CodeContainer;
