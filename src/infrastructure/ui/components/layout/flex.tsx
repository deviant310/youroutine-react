import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { FixedSize, getUnitWithMeasure, TransientProps } from "../../helpers";

export const Flex = memo<FlexProps>(props => {
  const { alignItems, gap, justifyContent, ...restProps } = props;

  return (
    <StyledFlex
      $alignItems={alignItems}
      $gap={gap}
      $justifyContent={justifyContent}
      {...restProps}
    />
  );
});

Flex.displayName = "Flex";

const StyledFlex = styled.div<TransientProps<StyledFlexProps>>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems};

  justify-content: ${({ $justifyContent }) =>
    $justifyContent &&
    {
      around: "space-around",
      between: "space-between",
      start: "start",
    }[$justifyContent]};

  gap: ${({ $gap }) => getUnitWithMeasure($gap)};
`;

export type FlexElementProps = HTMLAttributes<HTMLDivElement>;

export type StyledFlexProps = {
  alignItems?: "center" | "top" | "bottom" | "baseline";
  justifyContent?: "start" | "around" | "between";
  gap?: FixedSize;
};

export type FlexProps = FlexElementProps & StyledFlexProps;
