import Color from "color";

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
    tension: new Color(palette.atmosphere),
    accent: {
      1: new Shade(palette.folly, 1),
      2: new Shade(palette.folly, 0.72),
      3: new Shade(palette.folly, 0.48),
      4: new Shade(palette.folly, 0.32),
      5: new Shade(palette.folly, 0.2),
      6: new Shade(palette.folly, 0.16),
      7: new Shade(palette.folly, 0.1),
    },
    danger: new Color(palette.tomato),
    primary: new Color(palette.softEgg),
  },
};
