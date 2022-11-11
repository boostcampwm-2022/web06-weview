import { QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  // 향후 alert보다 UX 면에서 더 나은 사용자에게 에러 메시지를 보여줄 방법이 있다면 이를 이용해 처리한다.
  alert(title);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        staleTime: 1000 * 60 * 10, // 10분
        cacheTime: 1000 * 60 * 15, // 15분 (staleTime 보다 길게)
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
