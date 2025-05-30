import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TextAlign, TextCSS, TextProps, TextStyledProps } from "../core";
import { TransientProps } from "../utils";

export const Paragraph = memo<ParagraphProps>(
  ({ textAlign, color, size, weight, nowrap, children, ...props }) => (
    <ParagraphStyled
      $textAlign={textAlign}
      $size={size}
      $weight={weight}
      $nowrap={nowrap}
      $color={color}
      {...props}
    >
      {children}
    </ParagraphStyled>
  ),
);

const ParagraphStyled = styled.p<ParagraphStyledProps>`
  ${TextCSS};
  text-align: ${({ $textAlign }) =>
    $textAlign &&
    {
      center: "center",
      left: "left",
      right: "right",
    }[$textAlign]};
`;

export interface ParagraphProps
  extends Omit<HTMLAttributes<ParagraphElement>, "color">,
    Pick<TextProps, "size" | "weight" | "nowrap" | "color"> {
  textAlign?: TextAlign;
}

type ParagraphStyledProps = TextStyledProps &
  TransientProps<Pick<ParagraphProps, "textAlign">>;

export type ParagraphElement = HTMLParagraphElement;
