import { ElementRef } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, UnitIndex } from "../../helpers";

// TODO theme[any] must be forbidden
export const PaperCSS = css<PaperProps>`
  background-color: ${({ theme, $fill = theme.colors.main }) => $fill};

  box-shadow: ${({ $elevation, theme }) => {
    if (!$elevation) return;

    return `0 ${$elevation}rem ${$elevation * 1.5}rem 0 ${theme.colors.default[7].transparent()}`;
  }};

  border-radius: ${({ $radius = 0.8 }) => getUnitWithMeasure($radius)};
  border: ${({ theme, $bordered }) =>
    $bordered && `0.2rem solid ${theme.colors.default[7].transparent()}`};
`;

export const Paper = styled.div<PaperProps>`
  ${PaperCSS}
`;

export interface PaperProps {
  $fill?: string | null;
  $elevation?: UnitIndex;
  $radius?: UnitIndex;
  $bordered?: boolean;
}

export type PaperElement = ElementRef<typeof Paper>;
