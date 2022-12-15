import create from "zustand";
import { devtools } from "zustand/middleware";

import { Label, LabelType } from "@/types/search";
import { LABEL_NAME } from "@/constants/label";

export interface TotalLabels {
  details: Label[];
  tags: Label[];
  likes: Label[];
  reviews: Label[];
}

export interface LabelStore {
  // state
  detailsLabels: Label[];
  tagsLabels: Label[];
  likesLabels: Label[];
  reviewsLabels: Label[];
  // setter
  setDetailsLabels: (labels: Label[]) => void;
  setTagsLabels: (labels: Label[]) => void;
  setLikesLabels: (labels: Label[]) => void;
  setReviewsLabels: (labels: Label[]) => void;
}

const initialState = {
  detailsLabels: [],
  tagsLabels: [],
  likesLabels: [],
  reviewsLabels: [],
};

const useLabelStore = create<LabelStore>()(
  devtools((set, get) => ({
    ...initialState,
    setDetailsLabels: (labels) => {
      set({ detailsLabels: labels });
    },
    setTagsLabels: (labels) => {
      set({ tagsLabels: labels });
    },
    setLikesLabels: (labels) => {
      set({ likesLabels: labels });
    },
    setReviewsLabels: (labels) => {
      set({ reviewsLabels: labels });
    },
  }))
);

export const getSearchState = (
  store: LabelStore,
  labelType: LabelType
): [
  TotalLabels,
  (targetTotalLabels: TotalLabels) => void,
  Label[],
  (labels: Label[]) => void
] => {
  const totalLabels = {
    details: store.detailsLabels,
    tags: store.tagsLabels,
    likes: store.likesLabels,
    reviews: store.reviewsLabels,
  };
  const setTotalLabels = (targetTotalLabels: TotalLabels): void => {
    store.setDetailsLabels(targetTotalLabels.details);
    store.setTagsLabels(targetTotalLabels.tags);
    store.setLikesLabels(targetTotalLabels.likes);
    store.setReviewsLabels(targetTotalLabels.reviews);
  };
  switch (labelType) {
    case LABEL_NAME.DETAILS:
      return [
        totalLabels,
        setTotalLabels,
        store.detailsLabels,
        store.setDetailsLabels,
      ];
    case LABEL_NAME.TAGS:
      return [
        totalLabels,
        setTotalLabels,
        store.tagsLabels,
        store.setTagsLabels,
      ];
    case LABEL_NAME.LIKES:
      return [
        totalLabels,
        setTotalLabels,
        store.likesLabels,
        store.setLikesLabels,
      ];
    case LABEL_NAME.REVIEWS:
      return [
        totalLabels,
        setTotalLabels,
        store.reviewsLabels,
        store.setReviewsLabels,
      ];
    default:
      return [
        totalLabels,
        setTotalLabels,
        store.detailsLabels,
        store.setDetailsLabels,
      ];
  }
};

export default useLabelStore;
