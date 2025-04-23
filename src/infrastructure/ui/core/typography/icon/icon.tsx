import { memo } from "react";

import styled, { css } from "styled-components";

import {
  ColoredCSS,
  ColoredProps,
  getUnitWithMeasureBySize,
  SizedProps,
} from "../../../css";
import { TransientProps } from "../../../utils";

import * as Icons from "./icons";

export const Icon = memo<IconProps>(
  ({ type, color, size }) =>
    ({
      chevron: <ChevronIcon $size={size} $color={color} />,
      close: <CloseIcon $size={size} $color={color} />,
      error: <ErrorIcon $size={size} $color={color} />,
      settings: <SettingsIcon $size={size} $color={color} />,
      signOut: <SignOutIcon $size={size} $color={color} />,
      warning: <WarningIcon $size={size} $color={color} />,
    })[type],
);

const IconBaseCSS = css<IconStyledProps>`
  color: ${ColoredCSS};
  display: flex;
  height: ${({ $size }) => getUnitWithMeasureBySize($size)};
`;

const IconMonotoneCSS = css<IconStyledProps>`
  ${IconBaseCSS};

  & path {
    fill: currentColor;
  }
`;

/* const IconDuotoneCSS = css<TransientProps<IconStyledProps>>`
  ${IconBaseCSS};

  & path {
    fill: currentColor;
  }
`; */

const ChevronIcon = styled(Icons.Chevron)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

const CloseIcon = styled(Icons.Close)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

const ErrorIcon = styled(Icons.Error)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

const SettingsIcon = styled(Icons.Settings)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

const SignOutIcon = styled(Icons.SignOut)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

const WarningIcon = styled(Icons.Warning)<IconStyledProps>`
  ${IconMonotoneCSS}
`;

interface IconProps extends ColoredProps, SizedProps {
  type: IconType;
}

type IconStyledProps = TransientProps<Pick<IconProps, "size" | "color">>;

export type IconType = Uncapitalize<keyof typeof Icons>;
