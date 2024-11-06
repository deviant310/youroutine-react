import { createElement, memo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PropsWithRequiredChildren } from "~/react";

import { RequestUnauthorizedError } from "../helpers";

export const queryClient = new QueryClient({
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

export const HttpProvider = memo<PropsWithRequiredChildren>(props => {
  const { children } = props;

  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(ReactQueryDevtools),
    children,
  );
});
