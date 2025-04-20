import { css } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../utils";

export const SizedCSS = css<SizedStyledProps>`
  ${({ $size }) => {
    // TODO статику юнитов возможно стоит вынести в настройки темы
    if ($size === "tiny") return getUnitWithMeasure(1);
    if ($size === "small") return getUnitWithMeasure(1.2);
    if ($size === "compact") return getUnitWithMeasure(1.4);
    if ($size === "normal") return getUnitWithMeasure(1.6);
    if ($size === "medium") return getUnitWithMeasure(1.8);
    if ($size === "large") return getUnitWithMeasure(2);
    if ($size === "big") return getUnitWithMeasure(2.4);
    if ($size === "huge") return getUnitWithMeasure(2.8);
    if ($size === "massive") return getUnitWithMeasure(3.6);
    if ($size === "colossal") return getUnitWithMeasure(4.4);
  }};
`;

export interface SizedProps {
  size?: Size;
}

export type SizedStyledProps = TransientProps<SizedProps>;

export type Size =
  | "tiny"
  | "small"
  | "compact"
  | "normal"
  | "medium"
  | "large"
  | "big"
  | "huge"
  | "massive"
  | "colossal";
