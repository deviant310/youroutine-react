import { FunctionComponent, memo, useCallback, useState } from "react";

import {
  SelectInputContainerProps,
  SelectInputDropdownProps,
  SelectInputOptionItem,
  SelectInputProps,
  SelectInputValue,
  SelectInputVirtualList,
  SelectInputVirtualListItemRenderer,
  useSelectInput,
} from "react-inputs/select-input";
import { styled } from "styled-components";

import { Error, Clickable, Textbox, ClickableElement, Fieldset } from "../core";
import { animated } from "../helpers";

export const SelectField = memo(
  <Name extends string, OptionElement extends HTMLElement, OptionData>(
    props: SelectFieldProps<Name, OptionElement, OptionData>,
  ) => {
    type OptionRenderer = SelectInputVirtualListItemRenderer<
      ClickableElement,
      SelectInputOptionItem<OptionData>
    >;

    const {
      adornmentComponent,
      containerComponent: FieldContainer = SelectFieldContainer,
      dropdownComponent: FieldDropdown = SelectFieldDropdown,
      error,
      label,
      name,
      optionComponent: FieldOption,
      textboxComponent: FieldTextBox = Textbox,
      ...hookProps
    } = props;

    const [errorDisplayModeEnabled, setErrorDisplayMode] = useState(false);

    const enableErrorDisplayMode = useCallback(
      () => setErrorDisplayMode(true),
      [],
    );

    const {
      handleBlur,
      handleTextboxChange,
      optionsItems,
      showDropdown,
      textboxValue,
    } = useSelectInput({
      ...hookProps,
      onBlur: enableErrorDisplayMode,
    });

    const displayedError = errorDisplayModeEnabled && error;
    const inputInvalid = Boolean(displayedError);

    const renderOption = useCallback<OptionRenderer>(
      ({ data, key, onClick }, ref) => (
        <Clickable key={key} onClick={onClick} ref={ref} role="option">
          <FieldOption data={data} />
        </Clickable>
      ),
      [FieldOption],
    );

    return (
      <Fieldset>
        <ErrorAnimatedContainer>{displayedError}</ErrorAnimatedContainer>

        <FieldContainer onBlur={handleBlur} role="group" tabIndex={-1}>
          <FieldTextBox
            adornmentComponent={adornmentComponent}
            invalid={inputInvalid}
            name={name}
            onChange={handleTextboxChange}
            placeholder={label}
            role="textbox"
            value={textboxValue}
            variant="filled"
          />

          {showDropdown && (
            <FieldDropdown role="dialog">
              <SelectInputVirtualList
                items={optionsItems}
                renderItem={renderOption}
              />
            </FieldDropdown>
          )}
        </FieldContainer>
      </Fieldset>
    );
  },
);

const SelectFieldContainer = styled.div<SelectInputContainerProps>`
  position: relative;
`;

SelectFieldContainer.displayName = "SelectFieldContainer";

const SelectFieldDropdown = styled.div<SelectInputDropdownProps>`
  position: absolute;
  top: 100%;
  z-index: ${1e15 - 1};
  background-color: ${({ theme }) => theme.colors.primary.hex()};
  box-shadow: ${({ theme }) =>
    `0 3px 6px 0 ${theme.colors.primary.darken(0.15).hex()}`};
  width: -webkit-fill-available;
  overflow: hidden;
`;

SelectFieldDropdown.displayName = "SelectFieldDropdown";

const ErrorAnimatedContainer = animated(Error, "fade");

export type SelectFieldProps<
  Name extends string,
  OptionElement extends HTMLElement,
  OptionData,
> = Omit<
  SelectInputProps<Name, OptionElement, OptionData>,
  "optionComponent"
> & {
  adornmentComponent?: FunctionComponent;
  error?: string;
  optionComponent: SelectFieldOptionComponent<OptionData>;
};

export type SelectFieldOptionComponent<OptionData> = FunctionComponent<{
  data: OptionData;
}>;

export type SelectFieldValue<OptionData> = SelectInputValue<OptionData>;
