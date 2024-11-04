import { ElementRef, HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../helpers";

export const Paper = memo<PaperProps>(props => {
  const {
    elevation = 1.6,
    backdrop = true,
    radius = 0.8,
    ...restProps
  } = props;

  return (
    <PaperStyled
      $elevation={elevation}
      $backdrop={backdrop}
      $radius={radius}
      {...restProps}
    />
  );
});

export const PaperCSS = css<TransientProps<PaperStyledProps>>`
  overflow: hidden;
  background-color: ${({ theme, $backdrop }) =>
    $backdrop && theme.colors.default[9].filled()};

  box-shadow: ${({ $elevation, theme }) => {
    if (!$elevation) return;

    return `0 ${$elevation}rem ${$elevation * 1.5}rem 0 ${theme.colors.default[6].transparent()}`;
  }};

  border-radius: ${({ $radius }) => getUnitWithMeasure($radius)};
`;

const PaperStyled = styled.div<TransientProps<PaperStyledProps>>`
  ${PaperCSS}
`;

export interface PaperStyledProps {
  elevation?: UnitIndex;
  backdrop?: boolean;
  radius?: UnitIndex;
}

export interface PaperProps
  extends HTMLAttributes<HTMLDivElement>,
    PaperStyledProps {}

export type PaperElement = ElementRef<typeof PaperStyled>;
