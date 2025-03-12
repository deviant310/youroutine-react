import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useCallback,
  useRef,
} from "react";

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
  onChange,
  disabled,
  readOnly,
  placeholder,
  placeholderMuted,
  onBlur,
  onMouseDown,
  ...props
}: TextInputProps) {
  const inputRef = useRef<InputElement>(null);

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<InputElement>) => {
      onChange?.(target.value);
    },
    [onChange],
  );

  const onTextboxMouseDown = useCallback(
    (event: MouseEvent<TextboxElement>) => {
      const { target, currentTarget } = event;

      if (target !== currentTarget) return;

      setTimeout(() => inputRef.current?.focus(), 0);

      onMouseDown?.(event);
    },
    [onMouseDown],
  );

  const onTextboxBlur = useCallback(
    (event: FocusEvent<TextboxElement>) => {
      const { relatedTarget } = event;

      if (relatedTarget) return;

      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <TextboxStyled
      onMouseDown={onTextboxMouseDown}
      onBlur={onTextboxBlur}
      {...props}
    >
      <InputStyled
        ref={inputRef}
        name={name}
        value={value}
        onChange={onInputChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        placeholderMuted={placeholderMuted}
      />
    </TextboxStyled>
  );
}

const InputStyled = styled(Input)``;

const TextboxStyled = styled(Textbox).attrs({ tabIndex: -1 })`
  ${InputStyled} {
    width: 100%;
  }
`;

export interface TextInputProps
  extends Omit<TextboxProps, "onChange">,
    Pick<
      InputProps,
      "name" | "disabled" | "readOnly" | "placeholder" | "placeholderMuted"
    > {
  value?: string;
  onChange?(value: string): void;
}

export type TextInputElement = TextboxElement;
