import { FC, FunctionComponent, memo, ReactElement, useCallback } from "react";

import { styled } from "styled-components";

import { Paper } from "../core";
import { getUnitWithMeasure } from "../helpers";

export const Table: TableComponent = memo(props => {
  type Item = (typeof data)[number];

  const { data, columns, onRowClick } = props;

  const { captions, cells } = Object.entries(columns).reduce(
    (obj, [key, column]) => {
      const { caption, cellComponent } = column as TableColumn<
        Item,
        keyof Item
      >;

      obj.captions[key as string] = caption ?? key.toString();
      obj.cells[key as keyof Item] = cellComponent;

      return obj;
    },
    {
      captions: {} as Record<string, string>,
      cells: {} as {
        [Key in keyof Item]: CellComponent<Item, Key> | undefined;
      },
    },
  );

  return (
    <TableContainerStyled>
      <TableHead captions={captions} />

      {data.map((item, index) => (
        <TableRow key={index} item={item} cells={cells} onClick={onRowClick} />
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
  ({ item, cells, onClick: onRowClick }) => {
    const onClick = useCallback(() => onRowClick?.(item), [item, onRowClick]);

    return (
      <TableRowStyled onClick={onClick}>
        {Object.keys(cells).map(key => {
          const value = item[key as keyof typeof item];
          const Cell = cells[key as keyof typeof cells];

          return (
            <div key={key}>
              {Cell ? <Cell value={value} item={item} /> : `${value}`}
            </div>
          );
        })}
      </TableRowStyled>
    );
  },
);

const TableContainerStyled = styled(Paper).attrs({
  elevation: 0.6,
  backdrop: false,
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
    1fr
  );
  padding: ${getUnitWithMeasure(1.6)} ${getUnitWithMeasure(2)};
  background-color: ${({ theme }) => theme.colors.default[9].filled()};
`;

const TableHeadStyled = styled(TableRowStyled)`
  background-color: ${({ theme }) => theme.colors.default[2].filled()};
  color: ${({ theme }) => theme.colors.default[9].filled()};
`;

interface TableComponent extends Omit<FC, number> {
  <RowData extends object>(props: TableProps<RowData>): ReactElement;
}

interface TableProps<RowData extends object> {
  data: Array<RowData>;
  columns: TableColumns<RowData>;
  onRowClick?(rowData: RowData): void;
}

export type TableColumns<RowData extends object> = {
  [Key in keyof RowData]?: TableColumn<RowData, Key>;
};

interface TableColumn<RowData extends object, Key extends keyof RowData> {
  caption: string;
  cellComponent?: CellComponent<RowData, Key>;
}

interface TableRowComponent extends Omit<FunctionComponent, number> {
  <RowData extends object>(props: TableRowProps<RowData>): ReactElement;
}

interface TableRowProps<RowData extends object> {
  item: RowData;
  cells: { [Key in keyof RowData]: CellComponent<RowData, Key> | undefined };
  onClick?(rowData: RowData): void;
}

interface TableHeadProps {
  captions: Record<string, string>;
}

type CellComponent<RowData extends object, Key extends keyof RowData> = FC<
  CellProps<RowData, Key>
>;

interface CellProps<RowData extends object, Key extends keyof RowData> {
  value: RowData[Key];
  item: RowData;
}
