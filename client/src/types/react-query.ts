export interface InfiniteScrollRequest {
  lastId: string;
}

export interface InfiniteScrollResponse {
  lastId: string;
  isLast: boolean;
}
