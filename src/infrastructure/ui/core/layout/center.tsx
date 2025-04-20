import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../utils";

export const Center = memo<CenterProps>(({ align, ...props }) => (
  <StyledCenter $align={align} {...props} />
));

const StyledCenter = styled.div<CenterStyledProps>`
  display: grid;
  justify-content: ${({ $align }) => $align === "horizontal" && "center"};
  align-items: ${({ $align }) => $align === "vertical" && "center"};
  height: -webkit-fill-available;
`;

Center.displayName = "Center";

export interface CenterProps extends HTMLAttributes<CenterElement> {
  align: "horizontal" | "vertical";
}

export type CenterStyledProps = TransientProps<Pick<CenterProps, "align">>;

export type CenterElement = HTMLDivElement;
