import { memo } from "react";

import { styled } from "styled-components";

import { Link, LinkProps } from "~/infrastructure/router";
import { TextCSS, TextProps, TextStyledProps } from "~/infrastructure/ui";

export const TextLink = memo<TextLinkProps>(
  ({ color, size, weight, ...props }) => (
    <TextLinkStyled $color={color} $size={size} $weight={weight} {...props} />
  ),
);

const TextLinkStyled = styled(Link)<TextStyledProps>`
  ${TextCSS}
`;

export interface TextLinkProps extends Omit<LinkProps, "children">, TextProps {}
