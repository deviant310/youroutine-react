import {
  AnchorHTMLAttributes,
  createElement,
  memo,
  MouseEvent,
  useCallback,
} from "react";

import { useRouter } from "./context";

export const Link = memo<LinkPropsWithHTMLAttributes>(
  ({ to, onClick: handleClickEvent, ...props }) => {
    const { getRouteFromPath, navigate } = useRouter();

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
