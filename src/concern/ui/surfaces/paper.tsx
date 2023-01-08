import styled from 'styled-components';

interface PaperProps {
  elevation: number;
}

export const Paper = styled.div<PaperProps>`
  background-color: ${({ theme }) => theme.colors.primary.hex()};
  box-shadow: ${({ elevation, theme }) => (
    `0 ${elevation * 3}px ${elevation * 6}px 0 ${theme.colors.primary.darken(.15).hex()}`
  )};
  border-radius: 2px;
`;

Paper.displayName = 'Paper';
