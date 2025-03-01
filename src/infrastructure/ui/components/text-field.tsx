import { FieldsetHTMLAttributes, FocusEvent, Ref } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetElement,
  Grid,
  TextboxElement,
} from "../core";

import { TextInput, TextInputProps } from "./text-input";

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
  ...props
}: TextFieldPropsWithHTMLAttributes) {
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
        />
      </Grid>
    </Fieldset>
  );
}

const FieldErrorSlidable = animated(FieldError, "slide");

export interface TextFieldProps
  extends FieldProps,
    Omit<TextInputProps, "ref" | "invalid"> {
  onTextboxBlur?(event: FocusEvent<TextboxElement>): void;
  ref?: Ref<FieldsetElement>;
}

interface TextFieldPropsWithHTMLAttributes
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "onChange">,
    TextFieldProps {}
