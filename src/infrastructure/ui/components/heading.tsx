import { memo } from "react";

import { styled } from "styled-components";

import { Text, TextAlign, TextElement, TextProps } from "../core";
import { getUnitWithMeasure, TransientProps } from "../utils";

export const Heading = memo<HeadingProps>(({ level, textAlign, ...props }) => (
  <HeadingStyled $level={level} $textAlign={textAlign} {...props} />
));

const HeadingStyled = styled(Text).attrs<HeadingStyledProps>(({ $level }) => ({
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
  display: block;
  margin: ${({ $level }) => {
    if ($level === 4) return `${getUnitWithMeasure(2.2)} 0`;

    return `${getUnitWithMeasure(1)} 0`;
  }};
  font-weight: 600;
  text-align: ${({ $textAlign }) => $textAlign};
`;

Heading.displayName = "Heading";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface HeadingProps extends TextProps {
  level: HeadingLevel;
  textAlign?: TextAlign;
}

export type HeadingElement = TextElement;

export type HeadingStyledProps = TransientProps<
  Pick<HeadingProps, "level" | "textAlign">
>;
