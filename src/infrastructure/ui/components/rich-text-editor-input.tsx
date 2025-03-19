import { useCallback } from "react";

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
}: RichTextEditorInputProps) {
  const onEditorChange = useCallback(
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
        onChange={onEditorChange}
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
  extends Omit<TextboxProps, "onChange">,
    Pick<RichTextEditorProps, "name" | "minHeight"> {
  value?: string;
  onChange?(value: string): void;
}

export type RichTextEditorInputElement = HTMLDivElement;
