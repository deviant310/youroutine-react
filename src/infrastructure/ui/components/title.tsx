import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TextAlign } from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Title = memo<TitleProps>(props => {
  const { size = 0, textAlign, ...restProps } = props;

  switch (size) {
    default:
    case 0:
      return <H0 $textAlign={textAlign} {...restProps} />;

    case 1:
      return <H1 $textAlign={textAlign} {...restProps} />;

    case 2:
      return <H2 $textAlign={textAlign} {...restProps} />;

    case 3:
      return <H3 $textAlign={textAlign} {...restProps} />;

    case 4:
      return <H4 $textAlign={textAlign} {...restProps} />;

    case 5:
      return <H5 $textAlign={textAlign} {...restProps} />;

    case 6:
      return <H6 $textAlign={textAlign} {...restProps} />;

    case 7:
      return <H7 $textAlign={textAlign} {...restProps} />;
  }
});

Title.displayName = "Title";

const TitleStyled = styled.div<TransientProps<TitleStyledProps>>`
  margin: ${getUnitWithMeasure(4)} 0;
  font-weight: 600;
  text-align: ${({ $textAlign }) =>
    $textAlign &&
    {
      center: "center",
      left: "left",
      right: "right",
    }[$textAlign]};
`;

const H0 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(11)};
`;

const H1 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(9)};
`;

const H2 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(7)};
  line-height: ${getUnitWithMeasure(9)};
`;

const H3 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(6)};
`;

const H4 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(5)};
`;

const H5 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(4)};
`;

const H6 = styled(TitleStyled)`
  font-size: ${getUnitWithMeasure(3)};
`;

const H7 = styled(TitleStyled)`
  font-size: 0.625rem;
`;

export type TitleSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TitleStyledProps {
  textAlign?: TextAlign;
}

export interface TitleProps
  extends HTMLAttributes<HTMLDivElement>,
    TitleStyledProps {
  size?: TitleSize;
}
