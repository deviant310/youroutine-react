import {
  AnchorHTMLAttributes,
  createElement,
  memo,
  MouseEvent,
  useCallback,
  useContext,
} from "react";

import { context } from "./context";

export const Link = memo<LinkPropsWithHTMLAttributes>(
  ({ to, onClick: handleClickEvent, ...props }) => {
    const { getRouteFromPath, navigate } = useContext(context);

    const onClick = useCallback(
      (event: MouseEvent<LinkElement>) => {
        handleClickEvent?.(event);

        if (!to) return;

        if (getRouteFromPath(to)) {
          event.preventDefault();
          navigate(to);
        }
      },
      [getRouteFromPath, handleClickEvent, navigate, to],
    );

    return createElement("a", { href: to, onClick, ...props });
  },
);

export interface LinkProps {
  to: string | null;
}

export interface LinkPropsWithHTMLAttributes
  extends Omit<AnchorHTMLAttributes<LinkElement>, "href">,
    LinkProps {}

export type LinkElement = HTMLAnchorElement;
