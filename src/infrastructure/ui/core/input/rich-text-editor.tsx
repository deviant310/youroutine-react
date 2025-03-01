import {
  HTMLAttributes,
  memo,
  Ref,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { Editor, EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export const RichTextEditor = memo<RichTextEditorPropsWithHTMLAttributes>(
  ({ value, onChange: onUpdate, minHeight, ...props }) => {
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
      <EditorContentStyled editor={editor} $minHeight={minHeight} {...props} />
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export const getRichTextEditorTextFromHTML = (htmlString: string) => {
  const editor = new Editor({
    extensions,
    content: htmlString,
  });

  return editor.getText();
};

const extensions = [StarterKit];

const EditorContentStyled = styled(EditorContent)<RichTextEditorStyledProps>`
  & .tiptap {
    min-height: ${({ $minHeight }) => $minHeight};
  }

  & .tiptap ul,
  & .tiptap ol {
    padding-left: ${getUnitWithMeasure(2.6)};
  }

  & .tiptap ul li p,
  & .tiptap ol li p {
    margin: 0;
  }
`;

export interface RichTextEditorProps {
  name?: string;
  value?: string;
  onChange?(event: RichTextEditorChangeEvent): void;
  minHeight?: string;
  ref?: Ref<RichTextEditorElement>;
}

export type RichTextEditorStyledProps = TransientProps<
  Pick<RichTextEditorProps, "minHeight">
>;

export type RichTextEditorChangeEvent = EditorEvents["update"];

interface RichTextEditorPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<RichTextEditorElement>, "onChange">,
    RichTextEditorProps {}

export type RichTextEditorElement = HTMLDivElement;
