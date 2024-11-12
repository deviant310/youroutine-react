import {
  ChangeEvent,
  FieldsetHTMLAttributes,
  FocusEvent,
  memo,
  ReactNode,
  useCallback,
} from "react";

import { styled } from "styled-components";

import {
  animate,
  FieldErrorh,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetElement,
  FieldTextboxCSS,
  Grid,
  Textbox,
  TextboxElement,
  TextboxInputElement,
  TextboxSize,
} from "../core";

export const TextField = memo<TextFieldPropsWithHTMLAttributes>(props => {
  const {
    name,
    label,
    error,
    adornmentStart,
    adornmentEnd,
    textboxPlaceholder,
    textboxSize,
    value,
    onChange,
    onTextboxBlur,
    ...restProps
  } = props;

  const inputInvalid = Boolean(error);

  const onTextboxChange = useCallback(
    ({ target }: ChangeEvent<TextboxInputElement>) => {
      onChange?.(target.value);
    },
    [onChange],
  );

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
  onChange?(value: string): void;
  adornmentStart?: ReactNode;
  adornmentEnd?: ReactNode;
  textboxSize?: TextboxSize;
  textboxPlaceholder?: string;
  onTextboxBlur?(event: FocusEvent<TextboxElement>): void;
}

interface TextFieldPropsWithHTMLAttributes
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "name" | "onChange">,
    TextFieldProps {}
