import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { isSpaceKey, isSubmitKey } from "@/utils/pressedKeyCheck";
import SearchLabel from "@/components/ModalContainer/SearchModal/SearchForm/SearchLabel/SearchLabel";
import { Label } from "@/types/search";
import { SEPARATOR } from "@/constants/search";

const SearchForm = (): JSX.Element => {
  const [word, setWord] = useState("");
  const [labels, setLabels] = useState<Label[]>([]);

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWord(e.target.value);
  };

  const createLabel = (word: string): Label => {
    const separator = word[0];
    const value = word.slice(1);
    const type = SEPARATOR[separator] ?? "search";

    if (type === "search") {
      return { type, value: word };
    }

    return { type, value };
  };

  const handlePressedKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    if (!isSubmitKey(key) || word.length === 0) {
      return;
    }
    if (isSpaceKey(key)) {
      setLabels((labels) => [...labels, createLabel(word)]); // <- 여기서 어떻게 전처리를 한번 해주는게?
      setWord("");
    }
  };

  return (
    <span className="search-form">
      {labels.map((label, index) => (
        <SearchLabel key={index} label={label} />
      ))}
      <input
        type="text"
        className="search-form__input"
        value={word}
        onChange={handleWordChange}
        onKeyUp={handlePressedKey}
      />
    </span>
  );
};

export default SearchForm;
