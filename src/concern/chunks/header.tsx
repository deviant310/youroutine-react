import { memo } from "react";

import { styled } from "styled-components";

import { useToggle } from "~/react";

import { Link, LinkProps } from "~/infrastructure/router";
import {
  animated,
  Area,
  ChevronIcon,
  Clickable,
  Column,
  Flex,
  getUnitWithMeasure,
  Grid,
  LogoIcon,
  Paper,
  SettingsIcon,
  SignOutIcon,
  Text,
  TransientProps,
} from "~/infrastructure/ui";

import { projectsRoute, tasksRoute } from "~/concern/general/routes";

// TODO Вынести dropdown в infrastructure/ui
export const Header = memo(() => {
  const {
    value: dropdownIsVisible,
    off: hideDropdown,
    toggle: toggleDropdown,
  } = useToggle();

  return (
    <HeaderContainerStyled>
      <HeaderBarStyled>
        <Area marginHorizontal="auto" maxWidth="1200px">
          <Grid autoFlow="column" justifyContent="between" alignItems="center">
            <Flex alignItems="center" gap={3.2}>
              <LogoIcon />

              <Flex gap={1.2}>
                <HeaderNavLink text="Tasks" to={tasksRoute.build()} />
                <HeaderNavLink text="Projects" to={projectsRoute.build()} />
              </Flex>
            </Flex>

            <Area position="relative" onBlur={hideDropdown} tabIndex={-1}>
              <Flex alignItems="center" gap={0.4} onClick={toggleDropdown}>
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
                  <Paper elevation={1.2}>
                    <Area paddingVertical={0.8}>
                      <Column>
                        <Clickable onClick={hideDropdown}>
                          <Area paddingHorizontal={1.6}>
                            <Flex alignItems="center" gap={0.8}>
                              <SettingsIcon />

                              <Text>Settings</Text>
                            </Flex>
                          </Area>
                        </Clickable>
                      </Column>

                      <Column>
                        <Clickable onClick={hideDropdown}>
                          <Area paddingHorizontal={1.6}>
                            <Flex alignItems="center" gap={0.8}>
                              <SignOutIcon />

                              <Text>Log out</Text>
                            </Flex>
                          </Area>
                        </Clickable>
                      </Column>
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
  position: relative;
  z-index: 1;
  line-height: ${getUnitWithMeasure(4)};
  margin-bottom: ${getUnitWithMeasure(1.2)};

  &:after {
    content: "\u200b";
    display: inline-block;
  }
`;

export const HeaderBarStyled = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.default[6].filled()};
`;

const HeaderNavLink = memo<HeaderNavLinkProps>(({ text, to, ...props }) => {
  const active = to && window.location.pathname.includes(to);
  const disabled = window.location.pathname === to;

  return (
    <HeaderNavLinkStyled
      to={disabled ? null : to}
      $width={text.length}
      {...props}
    >
      <Text weight={active ? "semibold" : "regular"}>{text}</Text>
    </HeaderNavLinkStyled>
  );
});

const HeaderNavLinkStyled = styled(Link)<TransientProps<{ width: number }>>`
  width: ${({ $width }) => `calc(${$width}ch + ${getUnitWithMeasure(0.8)})`};
  text-align: center;
  text-decoration: none;
  transition: opacity 150ms;

  &:hover {
    opacity: 0.5;
  }
`;

const AnimatedArea = animated(Area, "scale");

interface HeaderNavLinkProps extends Omit<LinkProps, "children"> {
  text: string;
}
