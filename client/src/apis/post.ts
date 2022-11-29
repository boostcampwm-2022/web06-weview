import axiosInstance from "@/apis/axios";
import { PostPages, uploadImageProps, WritingResponse } from "@/types/post";
import { setQueryString } from "@/utils/queryString";
import useSearchStore from "@/store/useSearchStore";
import useWritingStore from "@/store/useWritingStore";
import { getLineCount } from "@/utils/code";
import { preventXSS } from "@/utils/regExpression";

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
}: uploadImageProps): Promise<string> => {
  const payload = new FormData();
  payload.append("file", await (await fetch(imageUri)).blob()); // imageURI -> file
  payload.append("Content-Type", "image/jpeg");
  Object.entries(preSignedData.fields).forEach(([key, value]) => {
    payload.append(key, value);
  });
  await axiosInstance.post(preSignedData.url, payload);
  return `${preSignedData.url}/${preSignedData.fields.Key}`;
};

export const postWritingsAPI = async (
  imageUrls: string[]
): Promise<WritingResponse> => {
  const { title, language, code, content, tags } = useWritingStore.getState();
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
