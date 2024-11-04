import { memo } from "react";

import { styled } from "styled-components";

import { Link, LinkProps } from "~/infrastructure/router";
import {
  TextCSS,
  TextProps,
  TextStyledProps,
  TransientProps,
} from "~/infrastructure/ui";
// TODO нужно как-то засунуть в infrastructure
export const TextLink = memo<TextLinkProps>(
  ({ size, weight, color, ...props }) => (
    <TextLinkStyled $color={color} $size={size} $weight={weight} {...props} />
  ),
);

const TextLinkStyled = styled(Link)<TransientProps<TextStyledProps>>`
  ${TextCSS}
`;

export interface TextLinkProps extends Omit<LinkProps, "children">, TextProps {}
