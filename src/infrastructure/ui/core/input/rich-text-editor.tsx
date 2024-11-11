import { memo } from "react";

import { BubbleMenu, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createGlobalStyle, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export const RichTextEditor = memo<RichTextEditorProps>(({ initialValue }) => (
  <ContainerStyled>
    <EditorStyle />

    <EditorProvider extensions={extensions} content={initialValue}>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  </ContainerStyled>
));

const extensions = [StarterKit];

const ContainerStyled = styled.div<TransientProps<RichTextEditorStyledProps>>`
  padding: ${getUnitWithMeasure(1.2)} ${getUnitWithMeasure(1.6)};
  background-color: ${({ theme }) => theme.colors.default[9].filled()};
  border-radius: ${getUnitWithMeasure(0.8)};
  transition: box-shadow 150ms;
  box-shadow: 0 0 0 2px inset
    ${({ $invalid, theme }) =>
      $invalid
        ? theme.colors.error[0].filled()
        : theme.colors.default[7].filled()};

  &:focus-within {
    box-shadow: 0 0 0 2px inset
      ${({ $invalid, theme }) =>
        $invalid
          ? theme.colors.error[0].filled()
          : theme.colors.primary[2].filled()};
  }
`;

const EditorStyle = createGlobalStyle`
  .tiptap>p:first-child {
    margin-top: 0;
  }

  .tiptap>p:last-child {
    margin-bottom: 0;
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

interface RichTextEditorProps extends RichTextEditorStyledProps {
  initialValue: string;
}
