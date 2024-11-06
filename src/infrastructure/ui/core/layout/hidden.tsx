import { ElementRef, HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../helpers";

export const Hidden = memo<HiddenPropsWithHTMLAttributes>(
  ({ on, ...props }) => <HiddenStyled $on={on} {...props} />,
);

const HiddenStyled = styled.div<TransientProps<HiddenStyledProps>>`
  visibility: ${({ $on }) => $on && "hidden"};
`;

export interface HiddenStyledProps {
  on: boolean | undefined;
}

export type HiddenElement = ElementRef<typeof HiddenStyled>;

interface HiddenPropsWithHTMLAttributes
  extends HTMLAttributes<HiddenElement>,
    HiddenStyledProps {}
