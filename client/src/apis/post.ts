import axios from "axios";

import axiosInstance from "@/apis/axios";
import {
  PostInfo,
  PostPages,
  UploadImageProps,
  WritingRequestParams,
  WritingResponse,
} from "@/types/post";
import { setQueryString } from "@/utils/queryString";
import useSearchStore from "@/store/useSearchStore";
import useWritingStore from "@/store/useWritingStore";
import { getLineCount } from "@/utils/code";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import {
  AuthorSearchFilter,
  SearchFilter,
  SingleSearchFilter,
} from "@/types/search";

export const fetchPost = async (pageParam: string): Promise<PostPages> => {
  const filter = useSearchStore.getState().filter as SearchFilter;
  const { data } = await axiosInstance.get(
    `/posts?${setQueryString({ ...filter, lastId: pageParam })}`
  );
  return data;
};

export const fetchUserPost = async (pageParam: string): Promise<PostPages> => {
  const filter = useSearchStore.getState().filter as AuthorSearchFilter;
  const { data } = await axiosInstance.get(
    `/users/${filter.userId}/posts?lastId=${pageParam}`
  );
  return data;
};

export const fetchBookmarkPost = async (
  pageParam: string
): Promise<PostPages> => {
  const { data } = await axiosInstance.get(`/bookmarks?lastId=${pageParam}`);
  return data;
};

export const fetchSinglePost = async (
  pageParam: string
): Promise<PostPages> => {
  const filter = useSearchStore.getState().filter as SingleSearchFilter;
  const { data } = await axiosInstance.get(
    `/posts/${filter.postId}?lastId=${pageParam}`
  );
  return data;
};

export const deletePost = async (postId: string): Promise<void> => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
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
  payload.append("Content-Type", "image/jpeg"); // file type 명시
  payload.append("file", await (await fetch(imageUri)).blob()); // imageURI -> file
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
  const requestParams: WritingRequestParams = {
    title,
    content,
    code,
    language,
    images: imageUrls,
    tags,
    lineCount: getLineCount(code),
  };
  const { data } = await axiosInstance.post("/posts", requestParams);
  return data;
};

export const toggleLikeAPI = async ({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked: boolean;
}): Promise<void> => {
  const { data } = isLiked
    ? await axiosInstance.delete(`/posts/${postId}/likes`)
    : await axiosInstance.post(`/posts/${postId}/likes`);
  return data;
};
