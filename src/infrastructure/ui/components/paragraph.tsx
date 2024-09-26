import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TextAlign } from "../core";
import { TransientProps } from "../helpers";

export const Paragraph = memo<ParagraphProps>(props => {
  const { textAlign, ...restProps } = props;

  return <ParagraphStyled $textAlign={textAlign} {...restProps} />;
});

const ParagraphStyled = styled.p<TransientProps<ParagraphStyledProps>>`
  display: inline-block;
  width: 100%;
  text-align: ${({ $textAlign }) =>
    $textAlign &&
    {
      center: "center",
      left: "left",
      right: "right",
    }[$textAlign]};
`;

export interface ParagraphStyledProps {
  textAlign?: TextAlign;
}

export interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    ParagraphStyledProps {}
