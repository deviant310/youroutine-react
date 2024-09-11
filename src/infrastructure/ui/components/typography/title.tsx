import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../helpers";

import { TextAlign } from "./types";

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

const TitleStyled = styled.div<TransientProps<TitleStyledProps>>`
  margin: 0.67em 0;
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
  font-size: 2.75em;
`;

const H1 = styled(TitleStyled)`
  font-size: 2.25em;
`;

const H2 = styled(TitleStyled)`
  font-size: 1.75em;
  line-height: 34px;
`;

const H3 = styled(TitleStyled)`
  font-size: 1.5em;
`;

const H4 = styled(TitleStyled)`
  font-size: 1.25em;
`;

const H5 = styled(TitleStyled)`
  font-size: 1em;
`;

const H6 = styled(TitleStyled)`
  font-size: 0.75em;
`;

const H7 = styled(TitleStyled)`
  font-size: 0.625em;
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
