import { styled } from "styled-components";

export const FieldError = styled.span<FieldErrorProps>`
  color: ${({ theme }) => theme.colors.danger.hex()};
  font-size: 90%;
  display: block;
  padding: 4px 15px 8px;
  transition: transform 0.2s;
  transform: translate(0, ${({ visible }) => (visible ? "0%" : "-100%")});

  &:before {
    content: "\u200b";
  }
`;

FieldError.displayName = "FieldError";

export interface FieldErrorProps {
  visible: boolean;
}
