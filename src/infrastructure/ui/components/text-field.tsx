import { ChangeEvent, FocusEvent, memo, ReactNode } from "react";

import { styled } from "styled-components";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldTextboxCSS,
  Grid,
  Textbox,
  TextboxElement,
  TextboxSize,
} from "../core";

export const TextField = memo<TextFieldProps>(props => {
  const {
    name,
    label,
    error,
    adornmentStart,
    adornmentEnd,
    textboxPlaceholder,
    textboxSize,
    value,
    setValue,
    onTextboxChange,
    onTextboxBlur,
    ...restProps
  } = props;

  const inputInvalid = Boolean(error);

  return (
    <Fieldset {...restProps}>
      <FieldErrorSlided>{error}</FieldErrorSlided>

      <Grid gap={0.4}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <TextboxStyled
          name={name}
          before={adornmentStart}
          after={adornmentEnd}
          invalid={inputInvalid}
          onBlur={onTextboxBlur}
          setValue={setValue}
          onChange={onTextboxChange}
          placeholder={textboxPlaceholder}
          value={value}
          size={textboxSize}
        />
      </Grid>
    </Fieldset>
  );
});

const TextboxStyled = styled(Textbox)`
  ${FieldTextboxCSS}
`;

const FieldErrorSlided = animated(FieldError, "slide");

export interface TextFieldProps extends FieldProps {
  value: string;
  setValue(value: string): void;
  adornmentStart?: ReactNode;
  adornmentEnd?: ReactNode;
  textboxSize?: TextboxSize;
  textboxPlaceholder?: string;
  onTextboxChange?(event: ChangeEvent<TextboxElement>): void;
  onTextboxBlur?(event: FocusEvent<TextboxElement>): void;
}
