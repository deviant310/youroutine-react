import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { Area, Grid, Icon, Text } from "../core";
import { getUnitWithMeasure, TransientProps } from "../utils";

export const Alert = memo<AlertProps>(
  ({ type, bordered, compact, title, message }) => (
    <AlertStyled $type={type} $bordered={bordered} $compact={compact}>
      <Grid templateColumns="auto 1fr" gap={1.6}>
        {type === "error" && <Icon type="error" color="error" />}
        {type === "warning" && <Icon type="warning" color="warning" />}

        <div>
          {title && (
            <Area marginBottom={0.6}>
              <Text weight="semibold">{title}</Text>
            </Area>
          )}

          <Text size="compact">{message}</Text>
        </div>
      </Grid>
    </AlertStyled>
  ),
);

const AlertStyled = styled.div<AlertStyledProps>`
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

export interface AlertProps
  extends Omit<HTMLAttributes<AlertElement>, "children"> {
  type: AlertType;
  message: string;
  title?: string;
  compact?: boolean;
  bordered?: boolean;
}

export type AlertStyledProps = TransientProps<
  Pick<AlertProps, "type" | "compact" | "bordered">
>;

export type AlertType = "error" | "warning";

export type AlertElement = HTMLDivElement;
