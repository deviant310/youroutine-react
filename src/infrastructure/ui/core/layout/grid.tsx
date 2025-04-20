import { HTMLAttributes, memo } from "react";

import { DataType } from "csstype";
import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../utils";

export const Grid = memo<GridProps>(
  ({
    justifyContent,
    templateColumns,
    columns,
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
      $columns={columns}
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

export const GridCSS = css<GridStyledProps>`
  display: grid;
  grid-auto-flow: ${({ $autoFlow }) => $autoFlow};
  align-items: ${({ $alignItems }) => $alignItems};
  align-self: ${({ $alignSelf }) => $alignSelf};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  gap: ${({ $gap }) => getUnitWithMeasure($gap)};
  column-gap: ${({ $columnGap }) => getUnitWithMeasure($columnGap)};
  row-gap: ${({ $rowGap }) => getUnitWithMeasure($rowGap)};

  grid-template-columns: ${({ $templateColumns, $columns }) => {
    if ($templateColumns) return $templateColumns;
    if ($columns) return `repeat(${Math.round($columns)}, 1fr)`;
  }};
`;

const GridStyled = styled.div<GridStyledProps>`
  ${GridCSS}
`;

export type GridStyledProps = TransientProps<
  Pick<
    GridProps,
    | "justifyContent"
    | "alignItems"
    | "alignSelf"
    | "autoFlow"
    | "templateColumns"
    | "gap"
    | "rowGap"
    | "columnGap"
    | "columns"
  >
>;

export interface GridProps extends HTMLAttributes<GridElement> {
  justifyContent?:
    | DataType.ContentDistribution
    | DataType.ContentPosition
    | "left"
    | "normal"
    | "right";
  alignItems?: DataType.SelfPosition | "baseline" | "normal" | "stretch";
  alignSelf?:
    | DataType.SelfPosition
    | "auto"
    | "baseline"
    | "normal"
    | "stretch";
  autoFlow?: "row" | "column";
  templateColumns?: string;
  gap?: UnitIndex;
  rowGap?: UnitIndex;
  columnGap?: UnitIndex;
  columns?: number;
}

export type GridElement = HTMLDivElement;
