import { Shade, Theme } from "~/infrastructure/ui";

import { palette } from "../palette";

export const ThemeDark: Theme = {
  colors: {
    default: {
      1: new Shade(palette.russianViolet, 1),
      2: new Shade(palette.russianViolet, 0.64),
      3: new Shade(palette.russianViolet, 0.4),
      4: new Shade(palette.russianViolet, 0.24),
      5: new Shade(palette.russianViolet, 0.16),
      6: new Shade(palette.russianViolet, 0.12),
      7: new Shade(palette.russianViolet, 0.08),
      8: new Shade(palette.russianViolet, 0.05),
      9: new Shade("white", 1),
    },
    primary: {
      0: new Shade(palette.mediumSlateBlue, 0.8, "black"),
      1: new Shade(palette.mediumSlateBlue, 0.9, "black"),
      2: new Shade(palette.mediumSlateBlue, 1),
      3: new Shade(palette.mediumSlateBlue, 0.72),
      4: new Shade(palette.mediumSlateBlue, 0.4),
      5: new Shade(palette.mediumSlateBlue, 0.24),
      6: new Shade(palette.mediumSlateBlue, 0.16),
      7: new Shade(palette.mediumSlateBlue, 0.12),
      8: new Shade(palette.mediumSlateBlue, 0.06),
    },
    secondary: {
      0: new Shade(palette.tomato, 0.9, "black"),
      1: new Shade(palette.tomato, 1),
      2: new Shade(palette.folly, 1),
      3: new Shade(palette.folly, 0.72),
      4: new Shade(palette.folly, 0.48),
      5: new Shade(palette.folly, 0.32),
      6: new Shade(palette.folly, 0.2),
      7: new Shade(palette.folly, 0.16),
      8: new Shade(palette.folly, 0.1),
    },
    error: {
      0: new Shade(palette.tomato, 1),
      1: new Shade(palette.folly, 0.1),
    },
  },
};
