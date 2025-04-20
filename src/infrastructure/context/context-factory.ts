import type { ReactNode } from "react";
import {
  createElement,
  createContext as createReactContext,
  memo,
  useContext,
} from "react";

export function contextFactory<Value>() {
  const context = createReactContext(null as Value);
  const { Provider: ReactProvider } = context;

  const Provider = memo<{ children: ReactNode; value: Value }>(
    ({ children, value }) => createElement(ReactProvider, { value }, children),
  );

  const useValue = () => useContext(context);

  return { Provider, useValue };
}
