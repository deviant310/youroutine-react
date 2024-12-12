import { ElementRef, HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TextAlign, TextCSS, TextStyledProps } from "../core";
import { TransientProps } from "../helpers";

export const Paragraph = memo<ParagraphPropsWithHTMLAttributes>(
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

const ParagraphStyled = styled.p<TransientProps<ParagraphStyledProps>>`
  ${TextCSS};
  text-align: ${({ $textAlign }) =>
    $textAlign &&
    {
      center: "center",
      left: "left",
      right: "right",
    }[$textAlign]};
`;

export interface ParagraphStyledProps extends TextStyledProps {
  textAlign?: TextAlign;
}

export interface ParagraphProps extends ParagraphStyledProps {
  children: string;
}

export interface ParagraphPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<ParagraphElement>, "children" | "color">,
    ParagraphProps {}

export type ParagraphElement = ElementRef<typeof ParagraphStyled>;
