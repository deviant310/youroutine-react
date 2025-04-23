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

export const SelectField = memo(function <OptionData>(
  props: SelectFieldProps<OptionData>,
) {
  const {
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
    loadingOptions,
    loadingOptionsError,
    ...restProps
  } = props;
  const invalid = Boolean(error);

  return (
    <Fieldset {...restProps}>
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
          loadingOptions={loadingOptions}
          loadingOptionsError={loadingOptionsError}
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
      | "loadingOptions"
      | "loadingOptionsError"
    > {
  onInputBlur?(event: FocusEvent<SelectInputElement>): void;
}
