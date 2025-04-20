import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../utils";

export const Hidden = memo<HiddenProps>(({ on, ...props }) => (
  <HiddenStyled $on={on} {...props} />
));

const HiddenStyled = styled.div<HiddenStyledProps>`
  visibility: ${({ $on }) => $on && "hidden"};
`;

export interface HiddenProps extends HTMLAttributes<HiddenElement> {
  on: boolean | undefined;
}

export type HiddenStyledProps = TransientProps<Pick<HiddenProps, "on">>;

export type HiddenElement = HTMLDivElement;
