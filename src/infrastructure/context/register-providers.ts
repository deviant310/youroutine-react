/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createElement,
  memo,
  FC,
  ComponentProps,
} from "react";

import { PropsWithRequiredChildren } from "~/react";

export function registerProviders<
  Providers extends {
    [K in keyof Providers]: Providers[K] extends FC<any>
      ? ComponentProps<Providers[K]> extends PropsWithRequiredChildren
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
