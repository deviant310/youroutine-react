import React from 'react';

import styled from 'styled-components';

import { Area, Center } from '../../concern/ui/layout';

import { Circle } from '../../concern/ui/shapes';

import { Paper } from '../../concern/ui/surfaces';

import { LoginConsumer, LoginProvider } from './login-context';

import { IdentificationForm, VerificationForm } from './components';

const Login = () => {
  return (
    <LoginProvider>
      <Area height="100vh">
        <Center>
          <Area m={2}>
            <Paper elevation={3}>
              <Area p={3.5} width={32}>
                <Center>
                  <LogoCircle size={7}>
                    <Center>
                      <LogoText>YR</LogoText>
                    </Center>
                  </LogoCircle>
                </Center>

                <Area mb={3.5}/>

                <LoginConsumer>
                  {({ stageState: [stage] }) => ({
                    identification: <IdentificationForm/>,
                    verification: <VerificationForm/>
                  }[stage])}
                </LoginConsumer>
              </Area>
            </Paper>
          </Area>
        </Center>
      </Area>
    </LoginProvider>
  );
};

const LogoCircle = styled(Circle)`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.accent.hex()};
`;

const LogoText = styled.span`
  font-size: 40px;
`;

export  default Login;
