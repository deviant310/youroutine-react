import {
  ElementRef,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { Editor, EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createGlobalStyle, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export const RichTextEditor = memo<RichTextEditorPropsWithHTMLAttributes>(
  ({ value, onChange: onUpdate, invalid, minHeight, ...props }) => {
    const ref = useRef<RichTextEditorElement>(null);
    const { current: content } = useRef(value);
    const editor = useEditor({ extensions, content, onUpdate });

    const onMouseDown = useCallback(
      (event: MouseEvent) => {
        if (event.target === ref.current)
          setTimeout(() => editor?.commands.focus(), 0);
      },
      [editor?.commands],
    );

    useEffect(() => {
      if (typeof value !== "undefined" && editor?.getHTML() !== value)
        editor?.commands.setContent(value, false);
    }, [editor, value]);

    useEffect(() => {
      const { current: element } = ref;

      element?.addEventListener("mousedown", onMouseDown);

      return () => element?.removeEventListener("mousedown", onMouseDown);
    }, [onMouseDown]);

    return (
      <ContainerStyled $invalid={invalid} {...props} ref={ref}>
        <EditorStyle minHeight={minHeight} />

        <EditorContent editor={editor} />
      </ContainerStyled>
    );
  },
);

export const getRichTextEditorTextFromHTML = (htmlString: string) => {
  const editor = new Editor({
    extensions,
    content: htmlString,
  });

  return editor.getText();
};

const extensions = [StarterKit];

const ContainerStyled = styled.div.attrs({ role: "textbox" })<
  TransientProps<RichTextEditorStyledProps>
>`
  cursor: text;
  padding: ${getUnitWithMeasure(1.2)} ${getUnitWithMeasure(1.6)};
  transition: box-shadow 150ms;

  border-left-width: ${getUnitWithMeasure(0.2)};
  border-left-style: solid;
  border-left-color: ${({ theme }) => theme.colors.default[6].filled()};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.default[4].filled()};
  }
`;
// TODO переделать на локальные стили (см. реализацию icon)
const EditorStyle = createGlobalStyle<Pick<RichTextEditorProps, "minHeight">>`
  .tiptap {
    min-height: ${({ minHeight }) => minHeight};
  }

  .tiptap ul, .tiptap ol {
    padding-left: ${getUnitWithMeasure(2.6)};
  }

  .tiptap ul li p, .tiptap ol li p {
    margin: 0;
  }
`;

export interface RichTextEditorStyledProps {
  invalid?: boolean;
}

export interface RichTextEditorProps extends RichTextEditorStyledProps {
  name?: string;
  value?: string;
  onChange?(event: RichTextEditorChangeEvent): void;
  minHeight?: string;
}

export type RichTextEditorChangeEvent = EditorEvents["update"];

interface RichTextEditorPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<RichTextEditorElement>, "onChange">,
    RichTextEditorProps {}

export type RichTextEditorElement = ElementRef<typeof ContainerStyled>;
