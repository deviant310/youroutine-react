import { ElementRef } from "react";

import { styled } from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export type ColumnElement = ElementRef<typeof Column>;

Column.displayName = "Column";
