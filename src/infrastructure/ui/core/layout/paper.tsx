import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import {
  UnitMultiplier,
  measure,
  getUnit,
  getUnitWithMeasure,
  TransientProps,
} from "../../helpers";

export const Paper = memo<PaperProps>(props => {
  const { elevation = 1, backdrop = true, radius = 3, ...restProps } = props;

  return (
    <PaperStyled
      $elevation={elevation}
      $backdrop={backdrop}
      $radius={radius}
      {...restProps}
    />
  );
});

const PaperStyled = styled.div<TransientProps<PaperStyledProps>>`
  overflow: hidden;
  background-color: ${({ theme, $backdrop }) =>
    $backdrop && theme.colors.default[9].filled()};
  box-shadow: ${({ $elevation, theme }) => {
    if (!$elevation) return;

    const measureValue = getUnit($elevation);

    return [
      `0 ${measureValue * 4}${measure} ${measureValue * 6}${measure} 0 ${theme.colors.default[7].transparent()}`,
      `0 ${measureValue}${measure} ${measureValue * 2}${measure} 0 ${theme.colors.default[8].transparent()}`,
    ].join(",");
  }};
  border-radius: ${({ $radius }) => getUnitWithMeasure($radius)};
`;

export interface PaperStyledProps {
  elevation?: UnitMultiplier;
  backdrop?: boolean;
  radius?: UnitMultiplier;
}

export interface PaperProps
  extends HTMLAttributes<HTMLDivElement>,
    PaperStyledProps {}
