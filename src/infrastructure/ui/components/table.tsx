import { FC, FunctionComponent, memo, ReactElement, useCallback } from "react";

import { styled } from "styled-components";

import { Paper } from "../core";
import { getUnitWithMeasure } from "../helpers";

export const Table: TableComponent = memo(props => {
  type RowData = (typeof rowsData)[number];

  const { rowsData, columns, onRowClick } = props;

  const { captions, cells } = Object.entries(columns).reduce(
    (obj, [key, column]) => {
      const { caption, cellComponent } = column as TableColumn<
        RowData,
        keyof RowData
      >;

      obj.captions[key as string] = caption ?? key.toString();
      obj.cells[key as keyof RowData] = cellComponent;

      return obj;
    },
    {
      captions: {} as Record<string, string>,
      cells: {} as {
        [Key in keyof RowData]: TableCellComponent<RowData, Key> | undefined;
      },
    },
  );

  return (
    <TableContainerStyled>
      <TableHead captions={captions} />

      {rowsData.map((rowData, index) => (
        <TableRow
          key={index}
          rowData={rowData}
          cells={cells}
          onClick={onRowClick}
        />
      ))}
    </TableContainerStyled>
  );
});

const TableHead = memo<TableHeadProps>(({ captions }) => {
  const captionsEntries = Object.entries(captions);

  return (
    <TableHeadStyled>
      {captionsEntries.map(([key, caption]) => (
        <div key={key}>{caption}</div>
      ))}
    </TableHeadStyled>
  );
});

const TableRow: TableRowComponent = memo(
  ({ rowData, cells, onClick: onRowClick }) => {
    const onClick = useCallback(
      () => onRowClick?.(rowData),
      [onRowClick, rowData],
    );

    return (
      <TableRowStyled onClick={onClick}>
        {Object.keys(cells).map(key => {
          const value = rowData[key as keyof typeof rowData];
          const Cell = cells[key as keyof typeof cells] as
            | TableCellComponent<typeof rowData, keyof typeof rowData>
            | undefined;

          return (
            <div key={key}>
              {Cell ? <Cell value={value} rowData={rowData} /> : `${value}`}
            </div>
          );
        })}
      </TableRowStyled>
    );
  },
);

const TableContainerStyled = styled(Paper).attrs({
  elevation: 0.6,
  fill: "transparent",
})`
  display: grid;
  gap: 2px;
  font-size: ${getUnitWithMeasure(1.4)};
  line-height: ${getUnitWithMeasure(2)};
`;

const TableRowStyled = styled.div`
  display: grid;
  gap: ${getUnitWithMeasure(2.4)};

  grid-template-columns: repeat(
    ${({ children }) => (Array.isArray(children) ? children.length : 0)},
    minmax(0, 1fr)
  );

  padding: ${getUnitWithMeasure(1.6)} ${getUnitWithMeasure(2)};
  background-color: ${({ theme }) => theme.colors.main};
`;

const TableHeadStyled = styled(TableRowStyled)`
  background-color: ${({ theme }) => theme.colors.default[2].filled()};
  color: ${({ theme }) => theme.colors.main};
`;

export interface TableComponent extends Omit<FC, number> {
  <RowData extends object>(props: TableProps<RowData>): ReactElement;
}

export interface TableProps<RowData extends object> {
  rowsData: Array<RowData>;
  columns: TableColumns<RowData>;
  onRowClick?(rowData: RowData): void;
}

export type TableColumns<RowData extends object> = {
  [Key in keyof RowData]?: TableColumn<RowData, Key>;
};

export interface TableColumn<
  RowData extends object,
  Key extends keyof RowData,
> {
  caption: string;
  cellComponent?: TableCellComponent<RowData, Key>;
}

export interface TableRowComponent extends Omit<FunctionComponent, number> {
  <RowData extends object>(props: TableRowProps<RowData>): ReactElement;
}

export interface TableRowProps<RowData extends object> {
  rowData: RowData;
  cells: {
    [Key in keyof RowData]: TableCellComponent<RowData, Key> | undefined;
  };
  onClick?(rowData: RowData): void;
}

export interface TableHeadProps {
  captions: Record<string, string>;
}

export type TableCellComponent<
  RowData extends object,
  Key extends keyof RowData,
> = FC<TableCellProps<RowData, Key>>;

export interface TableCellProps<
  RowData extends object,
  Key extends keyof RowData,
> {
  value: RowData[Key];
  rowData: RowData;
}
