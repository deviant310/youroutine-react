import { createContext, useContext } from "react";

import { RouteBuilder } from "./route";

const context = createContext({} as RouterContextValue);

export const { Provider: RouterProvider } = context;

export const useRouter = () => useContext(context);

export interface RouterContextValue {
  pathParams: Record<string, string>;
  navigate(to: string): void;
  getRouteFromPath(path: string): RouteBuilder | undefined;
  anchor: string | null;
  setAnchor(anchor: string | null): void;
}
