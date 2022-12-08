import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/react-query/queryClient";
import { isEmpty } from "@/utils/typeCheck";
import ReactRouter from "@/ReactRouter";
import CommonModalWrapper from "@/components/main/Modal/ModalWrapper/CommonModalWrapper";
import { useRefreshInterceptor } from "@/hooks/useRefreshInterceptor";
import ModalProvider from "@/components/commons/Modal/ModalProvider/ModalProvider";

import "./App.scss";

function App(): JSX.Element {
  useRefreshInterceptor();
  const queryClientRef = useRef<QueryClient>();
  if (isEmpty(queryClientRef.current)) {
    // current 값이 null 값일 때 변경이 발생하더라도 재렌더링이 일어나지 않기 위해 useRef 사용
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouter />
      <CommonModalWrapper />
      <ModalProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
