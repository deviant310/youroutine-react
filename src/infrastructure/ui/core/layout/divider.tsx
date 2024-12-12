import styled from "styled-components";

export const Divider = styled.hr`
  border: none;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.default[7].filled()};
`;
