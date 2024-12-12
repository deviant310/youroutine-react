import { ElementRef, HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { Grid, Icon } from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Alert = memo<AlertPropsWithHTMLAttributes>(
  ({ type, bordered, compact, children }) => (
    <AlertStyled $type={type} $bordered={bordered} $compact={compact}>
      <Grid templateColumns="auto 1fr" gap={1.6}>
        {type === "error" && <Icon type="error" color="error" />}
        {type === "warning" && <Icon type="warning" color="warning" />}
        {children}
      </Grid>
    </AlertStyled>
  ),
);

const AlertStyled = styled.div<TransientProps<AlertStyledProps>>`
  padding: ${({ $compact }) =>
    $compact
      ? `${getUnitWithMeasure(0.8)} ${getUnitWithMeasure(1.2)}`
      : `${getUnitWithMeasure(1.4)} ${getUnitWithMeasure(2)}`};

  border-radius: ${getUnitWithMeasure(1.2)};
  border-width: 0.1rem;
  border-style: ${({ $bordered }) => $bordered && "solid"};

  color: ${({ $type, $compact, theme }) => {
    if ($compact) {
      if ($type === "error") return theme.colors.error[1].filled();
      if ($type === "warning") return theme.colors.warning[2].filled();
    }
  }};

  border-color: ${({ $type, theme }) => {
    if ($type === "error") return theme.colors.error[1].filled();
    if ($type === "warning") return theme.colors.warning[2].filled();
  }};

  background-color: ${({ $type, theme }) => {
    if ($type === "error") return theme.colors.error[8].filled();
    if ($type === "warning") return theme.colors.warning[8].filled();
  }};
`;

export interface AlertStyledProps {
  type: AlertType;
  compact?: boolean;
  bordered?: boolean;
}

export interface AlertProps extends AlertStyledProps {
  children: string;
}

export type AlertType = "error" | "warning";

export type AlertElement = ElementRef<typeof AlertStyled>;

interface AlertPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<AlertElement>, "children">,
    AlertProps {}
