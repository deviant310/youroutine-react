/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createElement,
  memo,
  FC,
  ReactNode,
  ComponentProps,
} from "react";

export function registerProviders<
  Providers extends WithRequiredChildrenProps<Providers>,
>(...providers: Providers extends Array<any> ? Providers : never) {
  return memo<PropsWithChildren>(({ children }) =>
    providers.reduce(
      (children, provider) => createElement(provider, { children }),
      children,
    ),
  );
}

type ContextProviderProps = { children: ReactNode };

type WithRequiredChildrenProps<T> = {
  [K in keyof T]: T[K] extends FC<any>
    ? ComponentProps<T[K]> extends ContextProviderProps
      ? T[K]
      : { children: ReactNode }
    : never;
};
