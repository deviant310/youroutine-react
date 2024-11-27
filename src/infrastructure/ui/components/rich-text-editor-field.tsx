import { FieldsetHTMLAttributes, FocusEvent, memo, useCallback } from "react";

import { styled } from "styled-components";

import {
  animated,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  FieldsetElement,
  FieldTextboxCSS,
  Grid,
  RichTextEditor,
  RichTextEditorChangeEvent,
  RichTextEditorElement,
} from "../core";

export const RichTextEditorField =
  memo<RichTextEditorFieldPropsWithHTMLAttributes>(props => {
    const {
      name,
      label,
      error,
      value,
      editorMinHeight,
      onChange,
      onEditorBlur,
      ...restProps
    } = props;

    const editorInvalid = Boolean(error);

    const onEditorChange = useCallback(
      (event: RichTextEditorChangeEvent) => {
        onChange?.(event.editor.getHTML());
      },
      [onChange],
    );

    return (
      <Fieldset {...restProps}>
        <FieldErrorSlidable>{error}</FieldErrorSlidable>

        <Grid gap={0.4}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <RichTextEditorStyled
            name={name}
            value={value}
            onChange={onEditorChange}
            invalid={editorInvalid}
            onBlur={onEditorBlur}
            minHeight={editorMinHeight}
          />
        </Grid>
      </Fieldset>
    );
  });

const RichTextEditorStyled = styled(RichTextEditor)`
  ${FieldTextboxCSS}
`;

const FieldErrorSlidable = animated(FieldError, "slide");

export interface RichTextEditorFieldProps extends FieldProps {
  value: string;
  onChange?(value: string): void;
  onEditorBlur?(event: FocusEvent<RichTextEditorElement>): void;
  editorMinHeight?: string;
}

interface RichTextEditorFieldPropsWithHTMLAttributes
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "name" | "onChange">,
    RichTextEditorFieldProps {}
