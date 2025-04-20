import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../utils";

export const Paper = memo<PaperProps>(
  ({ fill, elevation, radius, bordered, ...props }) => (
    <PaperStyled
      $fill={fill}
      $elevation={elevation}
      $radius={radius}
      $bordered={bordered}
      {...props}
    />
  ),
);

// TODO theme[any] must be forbidden
export const PaperCSS = css<PaperStyledProps>`
  background-color: ${({ theme, $fill = theme.colors.main }) => $fill};

  box-shadow: ${({ $elevation, theme }) => {
    if (!$elevation) return;

    return `0 ${$elevation}rem ${$elevation * 1.5}rem 0 ${theme.colors.default[7].transparent()}`;
  }};

  border-radius: ${({ $radius = 0.8 }) => getUnitWithMeasure($radius)};
  border: ${({ theme, $bordered }) =>
    $bordered && `0.2rem solid ${theme.colors.default[7].transparent()}`};
`;

export const PaperStyled = styled.div<PaperStyledProps>`
  ${PaperCSS}
`;

export interface PaperProps extends HTMLAttributes<PaperElement> {
  fill?: string | null;
  elevation?: UnitIndex;
  radius?: UnitIndex;
  bordered?: boolean;
}

export type PaperStyledProps = TransientProps<
  Pick<PaperProps, "fill" | "elevation" | "radius" | "bordered">
>;

export type PaperElement = HTMLDivElement;
