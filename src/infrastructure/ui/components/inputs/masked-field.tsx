import {
  FunctionComponent,
  ReactElement,
  memo,
  useState,
  useCallback,
} from "react";

import {
  MaskedInputTextboxComponent,
  MaskedInputProps,
  MaskedInputValue,
  useMaskedInput,
} from "react-inputs/masked-input";

import { useAnimated } from "../../hooks";

import { FieldError, FieldWrapper, Textbox } from "./components";

export const MaskedField: MaskedFieldComponent = memo(props => {
  const {
    adornmentComponent,
    error,
    textboxComponent: FieldTextbox = Textbox,
    label,
    name,
    ...hookProps
  } = props;

  const [errorDisplayModeEnabled, setErrorDisplayMode] = useState(false);

  const {
    inputRef,
    inputValue,
    onInputChange,
    onInputKeyDown,
    onInputMouseDown,
  } = useMaskedInput(hookProps);

  const errorNode = errorDisplayModeEnabled && error;
  const inputInvalid = Boolean(errorNode);

  const [errorRef, errorSuspendableNode, errorIsVisible] =
    useAnimated(errorNode);

  const enableErrorDisplayMode = useCallback(
    () => setErrorDisplayMode(true),
    [],
  );

  return (
    <FieldWrapper>
      <FieldError visible={errorIsVisible} ref={errorRef}>
        {errorSuspendableNode}
      </FieldError>

      <FieldTextbox
        adornmentComponent={adornmentComponent}
        invalid={inputInvalid}
        name={name}
        onBlur={enableErrorDisplayMode}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onMouseDown={onInputMouseDown}
        placeholder={label}
        ref={inputRef}
        type="text"
        value={inputValue}
        variant="filled"
      />
    </FieldWrapper>
  );
});

export interface MaskedFieldComponent extends Omit<FunctionComponent, number> {
  <Name extends string>(props: MaskedFieldProps<Name>): ReactElement;
}

export interface MaskedFieldProps<Name extends string>
  extends MaskedInputProps<Name> {
  adornmentComponent?: FunctionComponent;
  error?: string;
}

export type MaskedFieldTextboxComponent = MaskedInputTextboxComponent;

export type MaskedFieldValue = MaskedInputValue;
