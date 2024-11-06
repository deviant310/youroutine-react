import { ElementRef, HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { Grid, WarningIcon } from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Alert = memo<AlertPropsWithHTMLAttributes>(
  ({ type, children }) => (
    <AlertStyled $type={type}>
      <Grid templateColumns="auto 1fr" gap={1.6}>
        {type === "error" && <WarningIcon />}

        {children}
      </Grid>
    </AlertStyled>
  ),
);

const AlertStyled = styled.div<TransientProps<AlertStyledProps>>`
  padding: ${getUnitWithMeasure(1.4)} ${getUnitWithMeasure(2)};
  border-radius: ${getUnitWithMeasure(1.2)};

  color: ${({ $type, theme }) => {
    if ($type === "error") return theme.colors.error[0].filled();
  }};

  border-color: ${({ $type, theme }) => {
    if ($type === "error") return theme.colors.error[0].filled();
  }};

  background-color: ${({ $type, theme }) => {
    if ($type === "error") return theme.colors.error[1].filled();
  }};
`;

export interface AlertStyledProps {
  type: "error";
}

export interface AlertProps extends AlertStyledProps {
  children: string;
}

export type AlertElement = ElementRef<typeof AlertStyled>;

interface AlertPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<AlertElement>, "children">,
    AlertProps {}
