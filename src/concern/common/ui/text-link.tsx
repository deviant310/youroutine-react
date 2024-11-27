import { memo } from "react";

import { styled } from "styled-components";

import { Link, LinkProps } from "~/infrastructure/router";
import {
  TextCSS,
  TextProps,
  TextStyledProps,
  TransientProps,
} from "~/infrastructure/ui";

export const TextLink = memo<TextLinkProps>(
  ({ type, size, weight, ...props }) => (
    <TextLinkStyled $type={type} $size={size} $weight={weight} {...props} />
  ),
);

const TextLinkStyled = styled(Link)<TransientProps<TextStyledProps>>`
  ${TextCSS}
`;

export interface TextLinkProps extends Omit<LinkProps, "children">, TextProps {}
