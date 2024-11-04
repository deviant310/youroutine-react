/*import {
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
} from "use-react-input/masked-input";

import { Error, Fieldset, Textbox } from "../core";
import { animated } from "../helpers";

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

  const displayedError = errorDisplayModeEnabled && error;
  const inputInvalid = Boolean(displayedError);

  const enableErrorDisplayMode = useCallback(
    () => setErrorDisplayMode(true),
    [],
  );

  return (
    <Fieldset>
      <ErrorAnimatedContainer>{displayedError}</ErrorAnimatedContainer>

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
    </Fieldset>
  );
});

const ErrorAnimatedContainer = animated(Error, "fade");

export interface MaskedFieldComponent extends Omit<FunctionComponent, number> {
  <Name extends string>(props: MaskedFieldProps<Name>): ReactElement;
}

export interface MaskedFieldProps<Name extends string>
  extends MaskedInputProps<Name> {
  adornmentComponent?: FunctionComponent;
  error?: string;
}

export type MaskedFieldTextboxComponent = MaskedInputTextboxComponent;

export type MaskedFieldValue = MaskedInputValue;*/
