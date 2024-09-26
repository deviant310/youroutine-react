import { memo } from "react";

import { styled } from "styled-components";

import { useToggle } from "~/infrastructure/hooks";
import {
  animated,
  Area,
  ChevronIcon,
  Clickable,
  Flex,
  getUnitWithMeasure,
  Grid,
  LogoIcon,
  Paper,
  SignOutIcon,
  Text,
} from "~/infrastructure/ui";

const AnimatedArea = animated(Area, "slide");

export const Header = memo(() => {
  const [dropdownIsVisible, { off: hideDropdown, toggle: toggleDropdown }] =
    useToggle();

  return (
    <HeaderContainerStyled>
      <HeaderBarStyled>
        <Area marginHorizontal="auto" maxWidth="1200px">
          <Grid autoFlow="column" justifyContent="between" alignItems="center">
            <LogoIcon />

            <Area position="relative" onBlur={hideDropdown}>
              <Flex alignItems="center" gap={1} onClick={toggleDropdown}>
                <Text>Anton Lebedev</Text>
                <ChevronIcon />
              </Flex>

              <AnimatedArea
                position="absolute"
                width="300px"
                top="100%"
                right={0}
                marginTop="-5px"
              >
                {dropdownIsVisible && (
                  <Paper elevation={1}>
                    <Area paddingVertical={2}>
                      <Clickable onClick={hideDropdown}>
                        <Area paddingHorizontal={4}>
                          <Flex alignItems="center" gap={2}>
                            <Text>Settings</Text>
                          </Flex>
                        </Area>
                      </Clickable>

                      <Clickable onClick={hideDropdown}>
                        <Area paddingHorizontal={4}>
                          <Flex alignItems="center" gap={2}>
                            <SignOutIcon />
                            <Text>Log out</Text>
                          </Flex>
                        </Area>
                      </Clickable>
                    </Area>
                  </Paper>
                )}
              </AnimatedArea>
            </Area>
          </Grid>
        </Area>
      </HeaderBarStyled>
    </HeaderContainerStyled>
  );
});

const HeaderContainerStyled = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;
  line-height: ${getUnitWithMeasure(10)};
  margin-bottom: ${getUnitWithMeasure(3)};
  &:after {
    content: "\u200b";
  }
`;

export const HeaderBarStyled = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.default[6].filled()};
`;
