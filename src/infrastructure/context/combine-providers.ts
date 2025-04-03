/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createElement,
  memo,
  FC,
  ComponentProps,
} from "react";

/**
 * This function combines multiple providers into a single component.
 * It takes an array of provider components and returns a new component
 * that renders all the providers in order, passing the children prop down
 * to each provider.
 *
 * Each provider must be a React component that accepts children as a prop.
 * The children prop must be required.
 */
export function combineProviders<
  Providers extends {
    [K in keyof Providers]: Providers[K] extends FC<any>
      ? ComponentProps<Providers[K]> extends Required<PropsWithChildren>
        ? Providers[K]
        : never
      : never;
  },
>(...providers: Providers extends Array<any> ? Providers : never) {
  return memo<Required<PropsWithChildren>>(({ children }) =>
    providers.reduce(
      (children, provider) => createElement(provider, { children }),
      children,
    ),
  );
}
