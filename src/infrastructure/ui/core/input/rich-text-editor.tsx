import { memo } from "react";

import { BubbleMenu, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createGlobalStyle } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export const RichTextEditor = memo<RichTextEditorProps>(({ initialValue }) => (
  <div>
    <EditorStyle />

    <EditorProvider extensions={extensions} content={initialValue}>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  </div>
));

const extensions = [StarterKit];

const EditorStyle = createGlobalStyle<
  TransientProps<RichTextEditorStyledProps>
>`
  .tiptap {
    padding: ${getUnitWithMeasure(1.2)} ${getUnitWithMeasure(1.6)};
    background-color: ${({ theme }) => theme.colors.default[9].filled()};
    border-radius: ${getUnitWithMeasure(0.8)};
    transition: box-shadow 150ms;
    box-shadow: 0 0 0 2px inset
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger.hex() : theme.colors.default[7].filled()};

    &:focus-within {
      box-shadow: 0 0 0 2px inset
      ${({ $invalid, theme }) =>
        $invalid
          ? theme.colors.danger.hex()
          : theme.colors.tension[2].filled()};
    }
  }

  .tiptap>p:first-child {
    margin-top: 0;
  }

  .tiptap>p:last-child {
    margin-bottom: 0;
  }

  .tiptap ul, .tiptap ol {
    padding-left: ${getUnitWithMeasure(1.6)};
  }

  .tiptap ul li p, .tiptap ol li p {
    margin: 0;
  }
`;

export interface RichTextEditorStyledProps {
  invalid?: boolean;
}

interface RichTextEditorProps extends RichTextEditorStyledProps {
  initialValue: string;
}
