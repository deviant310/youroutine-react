import { memo } from "react";

import styled, { css } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../../../helpers";
import { GlyphCSS, GlyphSize, GlyphStyledProps } from "../../helpers";

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

const IconBaseCSS = css<TransientProps<IconStyledProps>>`
  ${GlyphCSS};

  display: flex;

  height: ${({ $size }) => {
    if ($size === "large") return getUnitWithMeasure(2.8);
    if ($size === "medium") return getUnitWithMeasure(2.4);
    if ($size === "small") return getUnitWithMeasure(2);
    if ($size === "xsmall") return getUnitWithMeasure(1.6);
  }};
`;

const IconMonotoneCSS = css<TransientProps<IconStyledProps>>`
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

const ChevronIcon = styled(Icons.Chevron)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

const CloseIcon = styled(Icons.Close)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

const ErrorIcon = styled(Icons.Error)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

const SettingsIcon = styled(Icons.Settings)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

const SignOutIcon = styled(Icons.SignOut)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

const WarningIcon = styled(Icons.Warning)<TransientProps<IconStyledProps>>`
  ${IconMonotoneCSS}
`;

interface IconStyledProps extends GlyphStyledProps {
  size?: GlyphSize;
}

interface IconProps extends IconStyledProps {
  type: IconType;
}

export type IconType = Uncapitalize<keyof typeof Icons>;
