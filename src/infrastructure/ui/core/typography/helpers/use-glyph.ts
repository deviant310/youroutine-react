import { UnitIndex } from "../../../helpers";

export const defaultGlyphSize: UnitIndex = 2.4;

export interface GlyphProps {
  size?: UnitIndex;
  weight?: GlyphWeight;
  color?: string;
}

type GlyphWeight = "regular" | "medium" | "semibold";
