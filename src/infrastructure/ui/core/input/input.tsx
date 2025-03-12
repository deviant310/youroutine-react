import { Ref, InputHTMLAttributes } from "react";

import { styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export function Input({ placeholderMuted = true, ...props }: InputProps) {
  return <InputStyled $placeholderMuted={placeholderMuted} {...props} />;
}

export const InputStyled = styled.input<InputStyledProps>`
  height: ${getUnitWithMeasure(2.4)};
  padding: 0;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme, $placeholderMuted }) =>
      $placeholderMuted ? theme.colors.default[3].filled() : "inherit"};
  }
`;

export interface InputProps extends InputHTMLAttributes<InputElement> {
  placeholderMuted?: boolean;
  ref?: Ref<InputElement>;
}

type InputStyledProps = TransientProps<Pick<InputProps, "placeholderMuted">>;

export type InputElement = HTMLInputElement;
