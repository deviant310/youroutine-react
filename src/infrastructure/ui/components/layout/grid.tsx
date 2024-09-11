import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { FixedSize, getUnitWithMeasure, TransientProps } from "../../helpers";

export const Grid = memo<GridProps>(props => {
  const { alignItems, autoFlow, gap, justifyContent, ...restProps } = props;

  return (
    <StyledGrid
      $alignItems={alignItems}
      $autoFlow={autoFlow}
      $gap={gap}
      $justifyContent={justifyContent}
      {...restProps}
    />
  );
});

Grid.displayName = "Grid";

const StyledGrid = styled.div<TransientProps<StyledGridProps>>`
  display: grid;
  grid-auto-flow: ${({ $autoFlow }) => $autoFlow};
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

export type GridElementProps = HTMLAttributes<HTMLDivElement>;

export type StyledGridProps = {
  alignItems?: "center" | "top" | "bottom" | "baseline";
  autoFlow?: "row" | "column";
  gap?: FixedSize;
  justifyContent?: "start" | "around" | "between";
};

export type GridProps = GridElementProps & StyledGridProps;
