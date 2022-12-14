import { PropsWithChildren } from 'react';

import styled from 'styled-components';

type CircleProps = PropsWithChildren<{
  size: number;
  unit?: 'px' | 'em';
}>;

const Circle = styled.div`
  width: ${(props: CircleProps) => `${props.size}${props.unit ?? 'px'}`};
  height: ${(props: CircleProps) => `${props.size}${props.unit ?? 'px'}`};
  border-radius: 50%;
`;

export default Circle;
