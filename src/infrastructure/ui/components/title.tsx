import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TextAlign } from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Title = memo<TitleProps>(props => {
  const { size = 1, textAlign, ...restProps } = props;

  switch (size) {
    default:
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

    case 8:
      return <H8 $textAlign={textAlign} {...restProps} />;
  }
});

Title.displayName = "Title";

const TitleStyled = styled.div<TransientProps<TitleStyledProps>>`
  margin: ${getUnitWithMeasure(1.6)} 0;
  font-weight: 600;
  text-align: ${({ $textAlign }) =>
    $textAlign &&
    {
      center: "center",
      left: "left",
      right: "right",
    }[$textAlign]};
`;

const H1 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 1 })`
  font-size: ${getUnitWithMeasure(4.4)};
`;

const H2 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 2 })`
  font-size: ${getUnitWithMeasure(3.6)};
`;

const H3 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 3 })`
  font-size: ${getUnitWithMeasure(2.8)};
  line-height: ${getUnitWithMeasure(3.6)};
`;

const H4 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 4 })`
  font-size: ${getUnitWithMeasure(2.4)};
  line-height: ${getUnitWithMeasure(3.6)};
`;

const H5 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 5 })`
  font-size: ${getUnitWithMeasure(2)};
`;

const H6 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 6 })`
  font-size: ${getUnitWithMeasure(1.6)};
`;

const H7 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 7 })`
  font-size: ${getUnitWithMeasure(1.2)};
`;

const H8 = styled(TitleStyled).attrs({ role: "heading", "aria-level": 8 })`
  font-size: ${getUnitWithMeasure(1)};
`;

export type TitleSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface TitleStyledProps {
  textAlign?: TextAlign;
}

export interface TitleProps
  extends HTMLAttributes<HTMLDivElement>,
    TitleStyledProps {
  size?: TitleSize;
}
