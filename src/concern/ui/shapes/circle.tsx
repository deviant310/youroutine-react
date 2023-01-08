import { PropsWithChildren } from 'react';

import styled from 'styled-components';

export const Circle = styled.div<Circle.Props>`
  width: ${({ size }) => `${size}em`};
  height: ${({ size }) => `${size}em`};
  border-radius: 50%;
`;

Circle.displayName = 'Circle';

export namespace Circle {
  export type Props = PropsWithChildren<{
    size: number;
  }>
}
