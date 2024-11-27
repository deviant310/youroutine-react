import { ElementRef, HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { UnitIndex, getUnitWithMeasure, TransientProps } from "../../helpers";

export const Grid = memo<GridProps>(
  ({
    justifyContent,
    templateColumns,
    autoFlow,
    alignItems,
    alignSelf,
    gap,
    rowGap,
    columnGap,
    ...props
  }) => (
    <GridStyled
      $justifyContent={justifyContent}
      $templateColumns={templateColumns}
      $autoFlow={autoFlow}
      $alignItems={alignItems}
      $alignSelf={alignSelf}
      $gap={gap}
      $rowGap={rowGap}
      $columnGap={columnGap}
      {...props}
    />
  ),
);

Grid.displayName = "Grid";

export const GridCSS = css<TransientProps<GridStyledProps>>`
  display: grid;
  grid-auto-flow: ${({ $autoFlow }) => $autoFlow};
  align-items: ${({ $alignItems }) =>
    $alignItems &&
    {
      center: "center",
      baseline: "baseline",
      top: "start",
      bottom: "start",
    }[$alignItems]};

  align-self: ${({ $alignSelf }) =>
    $alignSelf &&
    {
      center: "center",
      baseline: "baseline",
      top: "start",
      bottom: "start",
    }[$alignSelf]};

  justify-content: ${({ $justifyContent }) =>
    $justifyContent &&
    {
      center: "center",
      around: "space-around",
      between: "space-between",
      left: "start",
      right: "end",
    }[$justifyContent]};

  gap: ${({ $gap }) => getUnitWithMeasure($gap)};
  column-gap: ${({ $columnGap }) => getUnitWithMeasure($columnGap)};
  row-gap: ${({ $rowGap }) => getUnitWithMeasure($rowGap)};

  grid-template-columns: ${({ $templateColumns }) => $templateColumns};
`;

const GridStyled = styled.div<TransientProps<GridStyledProps>>`
  ${GridCSS}
`;

export type GridStyledProps = {
  justifyContent?: "center" | "left" | "right" | "around" | "between";
  alignItems?: "center" | "top" | "bottom" | "baseline";
  alignSelf?: "center" | "top" | "bottom" | "baseline";
  autoFlow?: "row" | "column";
  templateColumns?: string;
  gap?: UnitIndex;
  rowGap?: UnitIndex;
  columnGap?: UnitIndex;
};

export interface GridProps
  extends HTMLAttributes<GridElement>,
    GridStyledProps {}

export type GridElement = ElementRef<typeof GridStyled>;
