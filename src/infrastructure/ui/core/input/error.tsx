import { styled } from "styled-components";

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger.hex()};
  font-size: 90%;
  display: block;
  padding: 4px 15px 8px;

  &:before {
    content: "\u200b";
  }
`;

Error.displayName = "Error";
