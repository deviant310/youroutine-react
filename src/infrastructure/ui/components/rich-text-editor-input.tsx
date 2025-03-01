import { HTMLAttributes, useCallback } from "react";

import styled from "styled-components";

import {
  RichTextEditor,
  RichTextEditorChangeEvent,
  RichTextEditorProps,
  Textbox,
  TextboxProps,
} from "../core";

export function RichTextEditorInput({
  name,
  value,
  onChange: onRichTextEditorInputChange,
  minHeight,
  ...props
}: RichTextEditorInputPropsWithHTMLAttributes) {
  const onChange = useCallback(
    ({ editor }: RichTextEditorChangeEvent) => {
      onRichTextEditorInputChange?.(editor.getHTML());
    },
    [onRichTextEditorInputChange],
  );

  return (
    <TextboxStyled {...props}>
      <RichTextEditorStyled
        name={name}
        value={value}
        onChange={onChange}
        minHeight={minHeight}
      />
    </TextboxStyled>
  );
}

const RichTextEditorStyled = styled(RichTextEditor)``;

const TextboxStyled = styled(Textbox)`
  ${RichTextEditorStyled} {
    width: 100%;
  }
`;

export interface RichTextEditorInputProps
  extends TextboxProps,
    Omit<RichTextEditorProps, "onChange"> {
  onChange?(value: string): void;
}

interface RichTextEditorInputPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<RichTextEditorInputElement>, "onChange">,
    RichTextEditorInputProps {}

export type RichTextEditorInputElement = HTMLDivElement;
