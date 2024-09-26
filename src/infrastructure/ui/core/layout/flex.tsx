import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import {
  UnitMultiplier,
  getUnitWithMeasure,
  TransientProps,
} from "../../helpers";

export const Flex = memo<FlexProps>(props => {
  const { alignItems, gap, justifyContent, ...restProps } = props;

  return (
    <FlexStyled
      $alignItems={alignItems}
      $gap={gap}
      $justifyContent={justifyContent}
      {...restProps}
    />
  );
});

Flex.displayName = "Flex";

export const FlexCSS = css<TransientProps<FlexStyledProps>>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems};

  justify-content: ${({ $justifyContent }) =>
    $justifyContent &&
    {
      center: "center",
      around: "space-around",
      between: "space-between",
      start: "start",
    }[$justifyContent]};

  gap: ${({ $gap }) => getUnitWithMeasure($gap)};
`;

const FlexStyled = styled.div<TransientProps<FlexStyledProps>>`
  ${FlexCSS}
`;

export type FlexStyledProps = {
  alignItems?: "center" | "top" | "bottom" | "baseline";
  justifyContent?: "center" | "start" | "around" | "between";
  gap?: UnitMultiplier;
};

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    FlexStyledProps {}
