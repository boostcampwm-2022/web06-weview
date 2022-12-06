import axiosInstance from "@/apis/axios";

export const addBookmarkPost = async (postId: string): Promise<void> => {
  await axiosInstance.post(`/bookmarks`, {
    postId,
  });
};

export const removeBookmarkPost = async (postId: string): Promise<void> => {
  await axiosInstance.delete(`/bookmarks?postId=${postId}`);
};
