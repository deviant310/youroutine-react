import styled from 'styled-components';

type CenterProps = {
  fitHeight?: boolean;
};

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props: CenterProps) => props.fitHeight ? '100vh' : 'inherit'};
`;
