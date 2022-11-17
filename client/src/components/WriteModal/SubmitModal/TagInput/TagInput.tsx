import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { isSubmitKey } from "@/utils/pressedKeyCheck";
import useWritingStore from "@/store/useWritingStore";
import { formatTag } from "@/utils/regExpression";

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
      if (!isSubmitKey(key)) return;
      if (tags.includes(tag)) {
        setTag("");
        alert("중복된 태그가 있습니다.");
        return;
      }
      setTags(formatTag(tag));
      setTag("");
    },
    [tags, tag]
  );

  const clickSubmittedTag = useCallback((tag: string) => {
    removeTag(tag);
  }, []);

  return (
    <>
      <input
        type="text"
        value={tag}
        onChange={changeTagValue}
        onKeyDown={handlePressedKey}
      />
      {tags.map((tag) => (
        <span onClick={() => clickSubmittedTag(tag)} key={tag}>
          {tag}
        </span>
      ))}
    </>
  );
};

export default TagInput;
