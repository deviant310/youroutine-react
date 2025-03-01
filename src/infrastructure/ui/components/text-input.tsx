import { ChangeEvent, HTMLAttributes, useCallback } from "react";

import styled from "styled-components";

import {
  Input,
  InputElement,
  InputProps,
  Textbox,
  TextboxElement,
  TextboxProps,
} from "../core";

export function TextInput({
  name,
  value,
  onChange: onTextInputChange,
  disabled,
  readOnly,
  placeholder,
  placeholderMuted,
  ...props
}: TextInputPropsWithHTMLAttributes) {
  const onChange = useCallback(
    ({ target }: ChangeEvent<InputElement>) => {
      onTextInputChange?.(target.value);
    },
    [onTextInputChange],
  );

  return (
    <TextboxStyled {...props}>
      <InputStyled
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        placeholderMuted={placeholderMuted}
      />
    </TextboxStyled>
  );
}

const InputStyled = styled(Input)``;

const TextboxStyled = styled(Textbox)`
  ${InputStyled} {
    width: 100%;
  }
`;

export interface TextInputProps extends TextboxProps, Omit<InputProps, "ref"> {
  onChange?(value: string): void;
}

interface TextInputPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<TextboxElement>, "onChange">,
    TextInputProps {}
