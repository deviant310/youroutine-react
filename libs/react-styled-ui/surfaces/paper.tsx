import styled from 'styled-components';

interface PaperProps {
  elevation: number;
}

const Paper = styled.div<PaperProps>`
  background-color: ${({ theme }) => theme.colors.surfaceBackground};
  box-shadow: ${({ elevation, theme }) => `0 ${elevation * 3}px ${elevation * 6}px 0 ${theme.colors.surfaceShadow}`};
  border-radius: 2px;
`;

export default Paper;
