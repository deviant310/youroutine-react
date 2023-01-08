import styled, { css } from 'styled-components';

type PopUpProps = {
  elevation: number;
  fillAvailableWidth?: boolean;
}

export const PopUp = styled.div<PopUpProps>`
  ${({ fillAvailableWidth }) => fillAvailableWidth && css`
    width: fill-available;
  `};
  position: absolute;
  z-index: ${1e15 - 1};
  background-color: ${({ theme }) => theme.colors.primary.hex()};
  box-shadow: ${({ elevation, theme }) => (
    `0 ${elevation * 3}px ${elevation * 6}px 0 ${theme.colors.primary.darken(.1).hex()}`
  )};
  border-radius: 2px;
  overflow: hidden;
`;

PopUp.displayName = 'PopUp';
