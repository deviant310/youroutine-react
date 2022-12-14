import React from 'react';

import styled from 'styled-components';

import { Circle } from '../../../libs/react-styled-ui/shapes';

import { Center } from '../../../libs/react-styled-ui/layout';

const LogoCircle = styled(Circle).attrs({ size: 100 })`
  background-color: ${({ theme }) => theme.colors.logoBackground};
  color: ${({ theme }) => theme.colors.textInverted};
  font-size: 40px;
`;

export const Logo = () => (
  <LogoCircle>
    <Center>YR</Center>
  </LogoCircle>
);
