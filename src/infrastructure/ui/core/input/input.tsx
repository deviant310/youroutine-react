import { Ref, InputHTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../utils";

export const Input = memo<InputProps>(
  ({ autoSize, placeholderMuted = true, ...props }) => (
    <InputStyled
      $autoSize={autoSize}
      $placeholderMuted={placeholderMuted}
      {...props}
    />
  ),
);

export const InputStyled = styled.input<InputStyledProps>`
  line-height: inherit;
  font-weight: inherit;
  padding: 0;
  border: none;
  outline: none;

  field-sizing: ${({ $autoSize }) => $autoSize && "content"};

  &::placeholder {
    color: ${({ theme, $placeholderMuted }) =>
      $placeholderMuted ? theme.colors.default[3].filled() : "inherit"};
  }
`;

export interface InputProps extends InputHTMLAttributes<InputElement> {
  autoSize?: boolean;
  placeholderMuted?: boolean;
  ref?: Ref<InputElement>;
}

type InputStyledProps = TransientProps<
  Pick<InputProps, "autoSize" | "placeholderMuted">
>;

export type InputElement = HTMLInputElement;
