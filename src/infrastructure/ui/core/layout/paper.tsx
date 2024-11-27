import { ElementRef, HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../helpers";

export const Paper = memo<PaperProps>(props => {
  const { fill, elevation, bordered, radius = 0.8, ...restProps } = props;

  return (
    <PaperStyled
      $fill={fill}
      $elevation={elevation}
      $radius={radius}
      $bordered={bordered}
      {...restProps}
    />
  );
});
// TODO theme[any] must be forbidden
export const PaperCSS = css<TransientProps<PaperStyledProps>>`
  overflow: hidden;
  background-color: ${({ theme, $fill = theme.colors.main }) => $fill};

  box-shadow: ${({ $elevation, theme }) => {
    if (!$elevation) return;

    return `0 ${$elevation}rem ${$elevation * 1.5}rem 0 ${theme.colors.default[7].transparent()}`;
  }};

  border-radius: ${({ $radius }) => getUnitWithMeasure($radius)};
  border: ${({ theme, $bordered }) =>
    $bordered && `0.2rem solid ${theme.colors.default[7].transparent()}`};
`;

const PaperStyled = styled.div<TransientProps<PaperStyledProps>>`
  ${PaperCSS}
`;

export interface PaperStyledProps {
  fill?: string | null;
  elevation?: UnitIndex;
  radius?: UnitIndex;
  bordered?: boolean;
}

export interface PaperProps
  extends HTMLAttributes<HTMLDivElement>,
    PaperStyledProps {}

export type PaperElement = ElementRef<typeof PaperStyled>;
