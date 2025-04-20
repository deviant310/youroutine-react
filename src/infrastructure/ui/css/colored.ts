import { css } from "styled-components";

import { TransientProps } from "../utils";

export const ColoredCSS = css<ColoredStyledProps>`
  ${({ theme, $color }) => {
    if ($color === "default") return theme.colors.default[1].filled();
    if ($color === "light") return theme.colors.default[2].filled();
    if ($color === "xlight") return theme.colors.default[3].filled();
    if ($color === "primary") return theme.colors.primary[2].filled();
    if ($color === "error") return theme.colors.error[1].filled();
    if ($color === "warning") return theme.colors.warning[2].filled();
  }};
`;

export interface ColoredProps {
  color?: Color;
}

export type ColoredStyledProps = TransientProps<ColoredProps>;

export type Color =
  | "default"
  | "light"
  | "xlight"
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "danger";
