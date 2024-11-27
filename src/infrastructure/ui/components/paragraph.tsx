import { ElementRef, HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { Text, TextAlign, TextProps } from "../core";
import { TransientProps } from "../helpers";

export const Paragraph = memo<ParagraphPropsWithHTMLAttributes>(
  ({ textAlign, type, size, weight, nowrap, children, ...props }) => (
    <ParagraphStyled $textAlign={textAlign} {...props}>
      <Text type={type} size={size} weight={weight} nowrap={nowrap}>
        {children}
      </Text>
    </ParagraphStyled>
  ),
);

const ParagraphStyled = styled.p<TransientProps<ParagraphStyledProps>>`
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

export interface ParagraphProps extends ParagraphStyledProps, TextProps {}

export interface ParagraphPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<ParagraphElement>, "children">,
    ParagraphProps {}

export type ParagraphElement = ElementRef<typeof ParagraphStyled>;
