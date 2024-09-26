import { FC, FunctionComponent, memo, ReactElement, useCallback } from "react";

import { styled } from "styled-components";

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
        {Object.entries(item).map(([key, value]) => {
          const Cell = cells[key as keyof typeof item] as
            | CellComponent<typeof item, keyof typeof item>
            | undefined;

          return (
            <div key={key}>
              {Cell ? <Cell value={value} item={item} /> : value}
            </div>
          );
        })}
      </TableRowStyled>
    );
  },
);

const TableContainerStyled = styled.div`
  display: grid;
  gap: 2px;
  overflow: hidden;
  font-size: 88%;
`;

const TableRowStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${({ children }) => (Array.isArray(children) ? children.length : 0)},
    1fr
  );
  padding: ${getUnitWithMeasure(4)} ${getUnitWithMeasure(5)};
  background-color: ${({ theme }) => theme.colors.default[9].filled()};
`;

const TableHeadStyled = styled(TableRowStyled)`
  background-color: ${({ theme }) => theme.colors.default[2].filled()};
  color: ${({ theme }) => theme.colors.default[9].filled()};
`;

interface TableComponent extends Omit<FC, number> {
  <Item extends object>(props: TableProps<Item>): ReactElement;
}

interface TableProps<Item extends object> {
  data: Array<Item>;
  columns: TableColumns<Item>;
  onRowClick?(rowData: Item): void;
}

export type TableColumns<Item extends object> = {
  [K in keyof Item]: TableColumn<Item, K>;
};

interface TableColumn<Item extends object, Key extends keyof Item> {
  caption: string;
  cellComponent?: CellComponent<Item, Key>;
}

interface TableRowComponent extends Omit<FunctionComponent, number> {
  <Item extends object>(props: TableRowProps<Item>): ReactElement;
}

interface TableRowProps<Item extends object> {
  item: Item;
  cells: { [K in keyof Item]: CellComponent<Item, K> | undefined };
  onClick?(rowData: Item): void;
}

interface TableHeadProps {
  captions: Record<string, string>;
}

type CellComponent<Item extends object, Key extends keyof Item> = FC<
  CellProps<Item, Key>
>;

interface CellProps<Item extends object, Key extends keyof Item> {
  value: Item[Key];
  item: Item;
}
