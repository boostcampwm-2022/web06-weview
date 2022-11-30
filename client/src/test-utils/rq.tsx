import { render, RenderResult } from "@testing-library/react";
import React, { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { generateQueryClient } from "@/react-query/queryClient";

const generateTestQueryClient = (): QueryClient => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export const renderUIWithReactQuery = (
  ui: ReactElement,
  client?: QueryClient
): RenderResult => {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

export const createQueryClientWrapper = (): (({
  children,
}: {
  children: ReactNode;
}) => JSX.Element) => {
  const queryClient = generateTestQueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
