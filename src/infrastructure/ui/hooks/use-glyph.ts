import { useMemo } from "react";

import { useTheme } from "styled-components";

import { FixedSize, getUnitWithMeasure } from "../helpers";

export const useGlyph = ({ size, type }: UseGlyphProps): UseGlyphResult => {
  const theme = useTheme();

  const color = useMemo(() => {
    if (type === "muted") return theme.colors.default[3].filled();

    return theme.colors.default[1].filled();
  }, [theme.colors.default, type]);

  const unitWithMeasure = getUnitWithMeasure(size);

  return { color, unitWithMeasure };
};

export interface UseGlyphProps {
  size?: FixedSize;
  type?: GlyphType;
}

export interface UseGlyphResult {
  color: string;
  unitWithMeasure: string | undefined;
}

export type GlyphType = "muted";
