import {
  FunctionComponent,
  ReactElement,
  memo,
  useState,
  useCallback,
} from "react";

import { TextInputProps, useTextInput } from "react-inputs/text-input";

import { Error, Fieldset, Textbox } from "../core";
import { animated } from "../helpers";

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
  const displayedError = errorDisplayModeEnabled && error;
  const inputInvalid = Boolean(displayedError);

  return (
    <Fieldset>
      <ErrorAnimatedContainer>{displayedError}</ErrorAnimatedContainer>

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
    </Fieldset>
  );
});

const ErrorAnimatedContainer = animated(Error, "fade");

export interface TextFieldComponent extends Omit<FunctionComponent, number> {
  <Name extends string>(props: TextFieldProps<Name>): ReactElement;
}

export interface TextFieldProps<Name extends string>
  extends TextInputProps<Name> {
  adornmentComponent?: FunctionComponent;
  error?: string;
}
