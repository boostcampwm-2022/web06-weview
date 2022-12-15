import React from "react";

import useSearch from "@/hooks/useSearch";
import { LIKE_COUNT_ITEMS, REVIEW_COUNT_ITEMS } from "@/constants/search";
import { LabelType } from "@/types/search";
import { LABEL_NAME } from "@/constants/label";

import "./DetailSearchForm.scss";

interface Item<T> {
  id: number;
  value: T;
  description: string;
}

interface ItemCheckBoxProps {
  item: Item<number>;
  checked: boolean;
  handleCheckItem: (id: number) => void;
}

const ItemCheckBox = ({
  item,
  checked,
  handleCheckItem,
}: ItemCheckBoxProps): JSX.Element => {
  return (
    <span
      className="detail-search-form__check-boxes__box"
      onClick={() => handleCheckItem(item.id)}
    >
      <span
        className={`detail-search-form__check-boxes__box--input ${
          checked ? "checked" : ""
        }`}
      ></span>
      <span className="detail-search-form__check-boxes__box--description">
        {item.description}
      </span>
    </span>
  );
};

interface CountCheckBoxesProps {
  title: string;
  items: Array<Item<number>>;
  imageModifier: string;
  type: LabelType;
}

const CountCheckBoxes = ({
  title,
  items,
  imageModifier,
  type,
}: CountCheckBoxesProps): JSX.Element => {
  const { labels, setLabels, hasLabel } = useSearch(type);
  // 현재 상태로 등록된 라벨의 id를 반환
  const id =
    items.find(
      ({ value }) => labels.length > 0 && String(value) === labels[0].value
    )?.id ?? -1;

  const toggleCheckItem = (id: number): void => {
    const item = items.find((item) => item.id === id) as Item<number>;
    const labelById = { type, value: String(item.value) };

    if (hasLabel(labelById, labels)) {
      return setLabels([]);
    }

    setLabels([labelById]);
  };

  return (
    <span className="detail-search-form__check-boxes">
      <img
        className={`detail-search-form__check-boxes__icon${imageModifier}`}
      />
      <span className="detail-search-form__check-boxes__title">{title}</span>
      {items.map((item) => (
        <ItemCheckBox
          key={item.id}
          item={item}
          checked={item.id === id}
          handleCheckItem={toggleCheckItem}
        />
      ))}
    </span>
  );
};

const LikeCountCheckBoxes = (): JSX.Element => {
  const items: Array<Item<number>> = LIKE_COUNT_ITEMS;
  return (
    <CountCheckBoxes
      title={"좋아요"}
      items={items}
      imageModifier={"--like"}
      type={"likes"}
    />
  );
};

const ReviewCountCheckBoxes = (): JSX.Element => {
  const items: Array<Item<number>> = REVIEW_COUNT_ITEMS;
  return (
    <CountCheckBoxes
      title={"리뷰"}
      items={items}
      imageModifier={"--review"}
      type={"reviews"}
    />
  );
};

const DetailSearchForm = (): JSX.Element => {
  const { word, handleWordChange, handleInsertTag, handleSubmit } = useSearch(
    LABEL_NAME.TAGS
  );

  return (
    <div className="detail-search-form">
      <div className="title">상세 검색</div>
      <input
        className="detail-search-form__input"
        type="text"
        value={word}
        placeholder={"태그를 엔터로 구분해서 입력할 수 있어요."}
        onChange={handleWordChange}
        onKeyUp={handleInsertTag}
      />
      <LikeCountCheckBoxes />
      <ReviewCountCheckBoxes />
      <div className="detail-search-form__footer">
        <button
          className="detail-search-form__footer__submit-btn"
          onClick={() => handleSubmit()}
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default DetailSearchForm;
