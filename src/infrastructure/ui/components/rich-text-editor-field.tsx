import { FieldsetHTMLAttributes, FocusEvent, memo, Ref } from "react";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetElement,
  Grid,
  RichTextEditorElement,
} from "../core";

import {
  RichTextEditorInput,
  RichTextEditorInputProps,
} from "./rich-text-editor-input";

export const RichTextEditorField =
  memo<RichTextEditorFieldPropsWithHTMLAttributes>(
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
            />
          </Grid>
        </Fieldset>
      );
    },
  );

const FieldErrorSlidable = animated(FieldError, "slide");

export interface RichTextEditorFieldProps
  extends FieldProps,
    Omit<RichTextEditorInputProps, "ref" | "invalid"> {
  onEditorBlur?(event: FocusEvent<RichTextEditorElement>): void;
  ref?: Ref<FieldsetElement>;
}

interface RichTextEditorFieldPropsWithHTMLAttributes
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "name" | "onChange">,
    RichTextEditorFieldProps {}
