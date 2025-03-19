import {
  createElement,
  createContext as createReactContext,
  memo,
  PropsWithChildren,
  useContext,
} from "react";

import { capitalize } from "~/typescript";

export const createContext = <Value, Key extends string>(key: Key) => {
  const context = createReactContext(null as Value);
  const { Provider: ReactProvider } = context;

  const Provider = memo<PropsWithChildren<{ [K in Key]: Value }>>(
    ({ children, ...props }) =>
      createElement(
        ReactProvider,
        { value: props[key as keyof typeof props] },
        children,
      ),
  );

  return {
    [`use${capitalize(key)}`]: () => useContext(context),
    [`${capitalize(key)}Provider`]: Provider,
  } as {
    [K in `use${Capitalize<Key>}`]: () => Value;
  } & {
    [K in `${Capitalize<Key>}Provider`]: typeof Provider;
  };
};
