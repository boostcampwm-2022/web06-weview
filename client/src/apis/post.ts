import axiosInstance from "@/apis/axios";
import { PostPages, WritingResponse } from "@/types/post";
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

interface uploadImageProps {
  url: string;
  imageFile: string;
}

export const uploadImage = async ({
  url,
  imageFile,
}: uploadImageProps): Promise<string> => {
  const { data } = await axiosInstance.put(url, imageFile, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
  return data;
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
