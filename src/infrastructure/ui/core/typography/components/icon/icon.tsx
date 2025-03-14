import { memo } from "react";

import styled, { css } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../../../helpers";
import { GlyphCSS, GlyphProps, GlyphSize } from "../../helpers";

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
  ${GlyphCSS};

  display: flex;

  height: ${({ $size }) => {
    if ($size === "tiny") return getUnitWithMeasure(1);
    if ($size === "small") return getUnitWithMeasure(1.2);
    if ($size === "compact") return getUnitWithMeasure(1.4);
    if ($size === "normal") return getUnitWithMeasure(1.6);
    if ($size === "medium") return getUnitWithMeasure(1.8);
    if ($size === "large") return getUnitWithMeasure(2);
    if ($size === "big") return getUnitWithMeasure(2.4);
    if ($size === "huge") return getUnitWithMeasure(2.8);
    if ($size === "massive") return getUnitWithMeasure(3.6);
    if ($size === "colossal") return getUnitWithMeasure(4.4);
  }};
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

interface IconProps extends GlyphProps {
  type: IconType;
  size?: GlyphSize;
}

type IconStyledProps = TransientProps<GlyphProps & Pick<IconProps, "size">>;

export type IconType = Uncapitalize<keyof typeof Icons>;
