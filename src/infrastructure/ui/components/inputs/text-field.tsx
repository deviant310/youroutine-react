import {
  FunctionComponent,
  ReactElement,
  memo,
  useState,
  useCallback,
} from "react";

import { TextInputProps, useTextInput } from "react-inputs/text-input";

import { useAnimated } from "../../hooks";

import { FieldError, FieldWrapper, Textbox } from "./components";

export const TextField: TextFieldComponent = memo(props => {
  const {
    adornmentComponent,
    error,
    textboxComponent: FieldTextbox = Textbox,
    label,
    name,
    ...hookProps
  } = props;

  const [errorDisplayModeEnabled, setErrorDisplayMode] = useState(false);

  const enableErrorDisplayMode = useCallback(
    () => setErrorDisplayMode(true),
    [],
  );

  const { inputValue, onInputChange } = useTextInput(hookProps);
  const errorNode = errorDisplayModeEnabled && error;
  const inputInvalid = Boolean(errorNode);

  const [errorRef, errorSuspendableNode, errorIsVisible] =
    useAnimated(errorNode);

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
        placeholder={label}
        type="text"
        value={inputValue}
        variant="filled"
      />
    </FieldWrapper>
  );
});

export interface TextFieldComponent extends Omit<FunctionComponent, number> {
  <Name extends string>(props: TextFieldProps<Name>): ReactElement;
}

export interface TextFieldProps<Name extends string>
  extends TextInputProps<Name> {
  adornmentComponent?: FunctionComponent;
  error?: string;
}
