import { memo, useCallback } from "react";

import styled from "styled-components";

import {
  RichTextEditor,
  RichTextEditorChangeEvent,
  RichTextEditorProps,
  Textbox,
  TextboxProps,
} from "../core";
import { getUnitWithMeasure } from "../utils";

export const RichTextEditorInput = memo<RichTextEditorInputProps>(props => {
  const {
    name,
    value,
    onChange: onRichTextEditorInputChange,
    minHeight,
    ...restProps
  } = props;

  const onEditorChange = useCallback(
    ({ editor }: RichTextEditorChangeEvent) => {
      onRichTextEditorInputChange?.(editor.getHTML());
    },
    [onRichTextEditorInputChange],
  );

  return (
    <TextboxStyled {...restProps}>
      <RichTextEditorStyled
        name={name}
        value={value}
        onChange={onEditorChange}
        minHeight={minHeight}
      />
    </TextboxStyled>
  );
});

const RichTextEditorStyled = styled(RichTextEditor)``;

const TextboxStyled = styled(Textbox)`
  padding: ${getUnitWithMeasure(1.2)} ${getUnitWithMeasure(1.6)};

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
