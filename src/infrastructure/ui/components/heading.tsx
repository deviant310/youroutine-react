import { styled } from "styled-components";

import { Text, TextAlign } from "../core";
import { getUnitWithMeasure } from "../helpers";

export const Heading = styled(Text).attrs<HeadingProps>(({ $level }) => ({
  role: "heading",
  "aria-level": $level,
  get size() {
    if ($level === 1) return "colossal";
    if ($level === 2) return "massive";
    if ($level === 3) return "huge";
    if ($level === 4) return "big";
    if ($level === 5) return "large";
    if ($level === 6) return "medium";
    if ($level === 7) return "normal";
    if ($level === 8) return "compact";
    if ($level === 9) return "small";
    if ($level === 10) return "tiny";
  },
}))`
  margin: ${getUnitWithMeasure(1)} 0;
  font-weight: 600;
  text-align: ${({ $textAlign }) => $textAlign};
`;

Heading.displayName = "Heading";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface HeadingProps {
  $level: HeadingLevel;
  $textAlign?: TextAlign;
}
