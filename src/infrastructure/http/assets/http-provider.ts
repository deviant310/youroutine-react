import { createElement, memo, PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NotFoundError, RequestUnauthorizedError } from "../helpers";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error: unknown) {
        if (error instanceof NotFoundError) return false;
        if (error instanceof RequestUnauthorizedError) return false;

        return failureCount < 3;
      },
    },
  },
});

export const HttpProvider = memo<Required<PropsWithChildren>>(props => {
  const { children } = props;

  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(ReactQueryDevtools),
    children,
  );
});
