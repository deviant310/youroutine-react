import { createElement, memo, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RequestUnauthorizedError } from "../helpers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error: unknown) {
        if (error instanceof RequestUnauthorizedError) return false;

        return failureCount < 3;
      },
    },
  },
});

export const HttpProvider = memo<{ children: ReactNode }>(props => {
  const { children } = props;

  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(ReactQueryDevtools),
    children,
  );
});
