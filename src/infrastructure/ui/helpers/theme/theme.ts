import Color from "color";

import { Shade } from "./shade";

export interface Theme {
  colors: {
    default: {
      1: Shade;
      2: Shade;
      3: Shade;
      4: Shade;
      5: Shade;
      6: Shade;
      7: Shade;
      8: Shade;
      9: Shade;
    };
    tension: Color;
    accent: {
      1: Shade;
      2: Shade;
      3: Shade;
      4: Shade;
      5: Shade;
      6: Shade;
      7: Shade;
    };
    danger: Color;
    primary: Color;
  };
}
