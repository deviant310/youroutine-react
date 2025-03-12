import { FocusEvent, memo } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  Grid,
  FieldsetProps,
} from "../core";

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
  before,
  implicit,
  searchValue,
  onSearchChange,
  size,
  placeholder,
  onInputBlur,
  ...props
}: SelectFieldProps<OptionData>) {
  const invalid = Boolean(error);

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
          before={before}
          implicit={implicit}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          size={size}
          placeholder={placeholder}
          invalid={invalid}
          onBlur={onInputBlur}
        />
      </Grid>
    </Fieldset>
  );
});

const ErrorSlidable = animated(FieldError, "slide");

export interface SelectFieldProps<OptionData>
  extends FieldProps,
    Omit<FieldsetProps, "onChange">,
    Pick<
      SelectInputProps<OptionData>,
      | "value"
      | "onChange"
      | "renderOption"
      | "displayStringForOption"
      | "dropdownToggleInitialValue"
      | "getOptionKey"
      | "options"
      | "before"
      | "implicit"
      | "searchValue"
      | "onSearchChange"
      | "size"
      | "placeholder"
    > {
  onInputBlur?(event: FocusEvent<SelectInputElement>): void;
}
