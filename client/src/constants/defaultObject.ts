import { PostInfo, CodeInfo } from "@/types/post";

import { DEFAULT_LANGUAGE } from "./options";

export const defaultPostInfo: PostInfo = {
  author: {
    id: "1",
    nickname: "",
    profileUrl: "",
    email: "",
  },
  category: "",
  code: "",
  content: "",
  id: "",
  images: [],
  language: "",
  likes: 0,
  tags: [],
  title: "",
  updatedAt: "",
};

export const defaultCodeInfo: CodeInfo = {
  code: "",
  language: DEFAULT_LANGUAGE,
  isEditable: false,
  setCode: undefined,
};
