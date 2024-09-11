import { PropsWithChildren } from "react";

import { styled } from "styled-components";

export const Circle = styled.div<CircleProps>`
  width: ${({ size }) => `${size}em`};
  height: ${({ size }) => `${size}em`};
  border-radius: 50%;
`;

Circle.displayName = "Circle";

export type CircleProps = PropsWithChildren<{
  size: number;
}>;
