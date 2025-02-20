import { FieldsetHTMLAttributes, FocusEvent, memo } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  Grid,
  FieldsetElement,
} from "../../core";

import {
  SelectInput,
  SelectInputElement,
  SelectInputProps,
} from "./select-input";

export const SelectField = memo(function <OptionData>({
  name,
  label,
  error,
  renderOption,
  displayStringForOption,
  dropdownToggleInitialValue = false,
  getOptionKey,
  options,
  value,
  onChange,
  adornmentStart,
  implicit,
  textboxValue,
  onTextboxChange,
  textboxSize,
  textboxPlaceholder,
  onInputBlur,
  ...props
}: SelectFieldPropsWithHTMLAttributes<OptionData>) {
  const textboxInvalid = Boolean(error);

  return (
    <Fieldset {...props}>
      <ErrorSlidable>{error}</ErrorSlidable>

      <Grid gap={0.4}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <SelectInput
          name={name}
          renderOption={renderOption}
          displayStringForOption={displayStringForOption}
          dropdownToggleInitialValue={dropdownToggleInitialValue}
          getOptionKey={getOptionKey}
          options={options}
          value={value}
          onChange={onChange}
          adornmentStart={adornmentStart}
          implicit={implicit}
          textboxValue={textboxValue}
          onTextboxChange={onTextboxChange}
          textboxSize={textboxSize}
          textboxPlaceholder={textboxPlaceholder}
          textboxInvalid={textboxInvalid}
          onBlur={onInputBlur}
        />
      </Grid>
    </Fieldset>
  );
});

const ErrorSlidable = animated(FieldError, "slide");

export interface SelectFieldProps<OptionData>
  extends FieldProps,
    SelectInputProps<OptionData> {
  onInputBlur?(event: FocusEvent<SelectInputElement>): void;
}

interface SelectFieldPropsWithHTMLAttributes<OptionData>
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "onChange">,
    SelectFieldProps<OptionData> {}
