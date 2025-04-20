import { HTMLAttributes, memo } from "react";

import { DataType } from "csstype";
import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../utils";

export const Flex = memo<FlexProps>(
  ({ alignItems, gap, justifyContent, ...props }) => (
    <FlexStyled
      $alignItems={alignItems}
      $gap={gap}
      $justifyContent={justifyContent}
      {...props}
    />
  ),
);

Flex.displayName = "Flex";

export const FlexCSS = css<FlexStyledProps>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};

  gap: ${({ $gap }) => getUnitWithMeasure($gap)};
`;

const FlexStyled = styled.div<FlexStyledProps>`
  ${FlexCSS}
`;

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  justifyContent?:
    | DataType.ContentDistribution
    | DataType.ContentPosition
    | "left"
    | "normal"
    | "right";
  alignItems?: DataType.SelfPosition | "baseline" | "normal" | "stretch";
  gap?: UnitIndex;
}

export type FlexStyledProps = TransientProps<
  Pick<FlexProps, "justifyContent" | "alignItems" | "gap">
>;
