import { HTMLAttributes, memo, PropsWithChildren } from "react";

import { styled } from "styled-components";

import {
  useGlyph,
  UseGlyphProps,
  UseGlyphResult,
} from "~/infrastructure/ui/hooks/use-glyph";

import { TransientProps } from "../../helpers";

export const Text = memo<TextProps>(({ size, type, ...props }) => {
  const { color, unitWithMeasure } = useGlyph({ size, type });

  return (
    <TextStyled $unitWithMeasure={unitWithMeasure} $color={color} {...props} />
  );
});

const TextStyled = styled.span<TransientProps<UseGlyphResult>>`
  font-size: ${({ $unitWithMeasure }) => $unitWithMeasure};
  color: ${({ $color }) => $color};
`;

export type TextProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & UseGlyphProps
>;
