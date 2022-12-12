import React, { useState } from "react";

import useLabel from "@/hooks/useLabel";
import { LIKE_COUNT_ITEMS, REVIEW_COUNT_ITEMS } from "@/constants/search";
import { LabelType } from "@/types/search";

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
  const { removeLabel, insertLabel, removeAndInsert } = useLabel();
  const [checkedItemId, setCheckedItemId] = useState<number>(-1);
  const handleCheckItem = (id: number): void => {
    const prevItem = items.find((item) => item.id === checkedItemId);
    const item = items.find((item) => item.id === id) as Item<number>;

    if (id === checkedItemId) {
      removeLabel({ type, value: String(item.value) });
      return setCheckedItemId(-1);
    }
    if (prevItem === undefined) {
      insertLabel({ type, value: String(item.value) });
      return setCheckedItemId(id);
    }

    removeAndInsert(
      { type, value: String(prevItem.value) },
      { type, value: String(item.value) }
    );
    setCheckedItemId(id);
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
          checked={item.id === checkedItemId}
          handleCheckItem={handleCheckItem}
        />
      ))}
    </span>
  );
};

const DetailSearchForm = (): JSX.Element => {
  return (
    <>
      <div className="title">세부 검색</div>
      <LikeCountCheckBoxes />
      <ReviewCountCheckBoxes />
    </>
  );
};

export default DetailSearchForm;
