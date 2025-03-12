import { FocusEvent } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetProps,
  Grid,
} from "../core";

import { TextInput, TextInputElement, TextInputProps } from "./text-input";

export function TextField({
  label,
  error,
  name,
  value,
  onChange,
  disabled,
  readOnly,
  placeholder,
  size,
  placeholderMuted,
  before,
  after,
  implicit,
  clickable,
  onInputBlur,
  ...props
}: TextFieldProps) {
  const invalid = Boolean(error);

  return (
    <Fieldset {...props}>
      <FieldErrorSlidable>{error}</FieldErrorSlidable>

      <Grid gap={0.4}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <TextInput
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          size={size}
          placeholderMuted={placeholderMuted}
          before={before}
          after={after}
          implicit={implicit}
          invalid={invalid}
          clickable={clickable}
          onBlur={onInputBlur}
        />
      </Grid>
    </Fieldset>
  );
}

const FieldErrorSlidable = animated(FieldError, "slide");

export interface TextFieldProps
  extends FieldProps,
    Omit<FieldsetProps, "onChange">,
    Pick<
      TextInputProps,
      | "value"
      | "onChange"
      | "readOnly"
      | "placeholder"
      | "placeholderMuted"
      | "size"
      | "before"
      | "after"
      | "implicit"
      | "clickable"
    > {
  onInputBlur?(event: FocusEvent<TextInputElement>): void;
}
