import axiosInstance from "@/apis/axios";
import { PostPages, UploadImageProps, WritingResponse } from "@/types/post";
import { setQueryString } from "@/utils/queryString";
import useSearchStore from "@/store/useSearchStore";
import useWritingStore from "@/store/useWritingStore";
import { getLineCount } from "@/utils/code";
import { preventXSS } from "@/utils/regExpression";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import axios from "axios";

export const fetchPost = async (pageParam: string): Promise<PostPages> => {
  const { searchQuery } = useSearchStore.getState();
  const { data } = await axiosInstance.get(
    `/posts?${setQueryString({ ...searchQuery, lastId: pageParam })}`
  );
  return data;
};

export const uploadImage = async ({
  preSignedData,
  imageUri,
}: UploadImageProps): Promise<string> => {
  const payload = new FormData();
  Object.entries(preSignedData.fields).forEach(([key, value]) => {
    payload.append(key, value);
  });
  payload.append("file", await (await fetch(imageUri)).blob()); // imageURI -> file
  payload.append("Content-Type", "image/jpeg"); // file type 명시
  await axios.post(preSignedData.url, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return `${preSignedData.url}/${preSignedData.fields.Key}`;
};

export const postWritingsAPI = async (
  imageUrls: string[]
): Promise<WritingResponse> => {
  const { title, content, tags } = useWritingStore.getState();
  const { language, code } = useCodeEditorStore.getState();
  const { data } = await axiosInstance.post("/posts", {
    title,
    category: "리뷰요청",
    content,
    code: preventXSS(code),
    language,
    images: imageUrls,
    tags,
    lineCount: getLineCount(code),
  });
  return data;
};
