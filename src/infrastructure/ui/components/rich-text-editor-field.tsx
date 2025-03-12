import { FocusEvent, memo } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetProps,
  Grid,
  RichTextEditorElement,
} from "../core";

import {
  RichTextEditorInput,
  RichTextEditorInputProps,
} from "./rich-text-editor-input";

export const RichTextEditorField = memo<RichTextEditorFieldProps>(
  ({
    name,
    label,
    error,
    value,
    onChange,
    minHeight,
    implicit,
    clickable,
    size,
    before,
    after,
    onEditorBlur,
    ...props
  }) => {
    const invalid = Boolean(error);

    return (
      <Fieldset {...props}>
        <FieldErrorSlidable>{error}</FieldErrorSlidable>

        <Grid gap={0.4}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <RichTextEditorInput
            name={name}
            value={value}
            onChange={onChange}
            minHeight={minHeight}
            implicit={implicit}
            invalid={invalid}
            clickable={clickable}
            size={size}
            before={before}
            after={after}
            onBlur={onEditorBlur}
          />
        </Grid>
      </Fieldset>
    );
  },
);

const FieldErrorSlidable = animated(FieldError, "slide");

export interface RichTextEditorFieldProps
  extends FieldProps,
    Omit<FieldsetProps, "onChange">,
    Pick<
      RichTextEditorInputProps,
      | "value"
      | "onChange"
      | "minHeight"
      | "implicit"
      | "clickable"
      | "size"
      | "before"
      | "after"
    > {
  onEditorBlur?(event: FocusEvent<RichTextEditorElement>): void;
}
