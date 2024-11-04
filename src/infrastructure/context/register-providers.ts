/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createElement,
  memo,
  NamedExoticComponent,
} from "react";

import { PropsWithRequiredChildren } from "~/react";

export function registerProviders<
  Providers extends {
    [K in keyof Providers]: NamedExoticComponent<PropsWithRequiredChildren> extends Providers[K]
      ? Providers[K]
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
