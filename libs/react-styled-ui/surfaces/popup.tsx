import styled from 'styled-components';

type PopUpProps = {
  elevation: number;
  fullWidth?: boolean;
}

const PopUp = styled.div<PopUpProps>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'initial'};
  position: absolute;
  z-index: ${1e15 - 1};
  background-color: ${({ theme }) => theme.colors.surfaceBackground};
  box-shadow: ${({ elevation, theme }) => `0 ${elevation * 3}px ${elevation * 6}px 0 ${theme.colors.surfaceShadow}`};
  border-radius: 2px;
  overflow: hidden;
`;

export default PopUp;
