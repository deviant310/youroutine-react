/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

import { Route } from "./route";

export const context = createContext({} as RouterContextValue);

export const { Provider } = context;

export interface RouterContextValue {
  pathParams: Record<string, string>;
  navigate(to: string): void;
  getRouteFromPath(path: string): Route<any> | undefined;
  anchor: string | null;
  setAnchor(anchor: string | null): void;
}
