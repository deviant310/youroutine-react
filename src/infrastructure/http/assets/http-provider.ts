import { createElement, memo, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  MethodNotAllowedError,
  NotFoundError,
  RequestUnauthorizedError,
} from "../helpers";

// TODO это должно быть в concern, т.к. является частью бизнес логики
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error: unknown) {
        if (error instanceof NotFoundError) return false;
        if (error instanceof MethodNotAllowedError) return false;
        if (error instanceof RequestUnauthorizedError) return false;

        return failureCount < 3;
      },
    },
  },
});

export const HttpProvider = memo<{ children: ReactNode }>(({ children }) =>
  createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(ReactQueryDevtools),
    children,
  ),
);
