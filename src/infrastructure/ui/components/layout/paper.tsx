import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import {
  FixedSize,
  measure,
  getUnit,
  getUnitWithMeasure,
  TransientProps,
} from "../../helpers";

export const Paper = memo<PaperProps>(({ elevation, backdrop, ...props }) => (
  <PaperStyled $elevation={elevation} $backdrop={backdrop} {...props} />
));

const PaperStyled = styled.div<TransientProps<PaperStyledProps>>`
  overflow: hidden;
  background-color: ${({ theme, $backdrop }) =>
    $backdrop && theme.colors.default[9].filled()};
  box-shadow: ${({ $elevation, theme }) => {
    const measureValue = getUnit($elevation);

    return [
      `0 ${measureValue * 4}${measure} ${measureValue * 6}${measure} 0 ${theme.colors.default[7].transparent()}`,
      `0 ${measureValue}${measure} ${measureValue * 2}${measure} 0 ${theme.colors.default[8].transparent()}`,
    ].join(",");
  }};
  border-radius: ${getUnitWithMeasure(2)};
`;

export interface PaperStyledProps {
  elevation: FixedSize;
  backdrop?: boolean;
}

export interface PaperProps
  extends HTMLAttributes<HTMLDivElement>,
    PaperStyledProps {}
