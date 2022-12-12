import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";

import { isSpaceKey, isSubmitKey } from "@/utils/pressedKeyCheck";
import useWritingStore from "@/store/useWritingStore";
import { formatTag } from "@/utils/regExpression";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import { LABEL_NAME } from "@/constants/label";
import { MAX_TAG_LENGTH } from "@/constants/tag";

import "./TagInput.scss";

const TagInput = (): JSX.Element => {
  const [tag, setTag] = useState("");
  const { tags, setTags, removeTag } = useWritingStore((state) => ({
    tags: state.tags,
    setTags: state.setTags,
    removeTag: state.removeTag,
  }));

  const changeTagValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  }, []);

  const handlePressedKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;
      if (!isSubmitKey(key) || tag.length === 0) return;
      if (isSpaceKey(key)) {
        setTag(formatTag(tag));
        return;
      }
      if (tags.includes(tag.trim()) || tags.includes(formatTag(tag))) {
        setTag("");
        alert("중복된 태그가 있습니다.");
        return;
      }
      if (tags.length >= MAX_TAG_LENGTH) {
        alert("태그는 5개까지 입력가능합니다.");
        return;
      }
      setTags(formatTag(tag));
      setTag("");
    },
    [tags, tag]
  );

  const clickSubmittedTag = (tag: string): void => {
    removeTag(tag);
  };

  return (
    <>
      <label className="tag-label" htmlFor="tag">
        태그들을 입력해주세요
      </label>
      <input
        type="text"
        className="tag-input"
        value={tag}
        onChange={changeTagValue}
        onKeyUp={handlePressedKey}
      />
      <div className="tag-list">
        {tags.map((tag) => (
          <SearchLabel
            key={tag}
            label={{ type: LABEL_NAME.TAGS, value: tag }}
            onClickCallback={() => clickSubmittedTag(tag)}
          />
        ))}
      </div>
    </>
  );
};

export default TagInput;
