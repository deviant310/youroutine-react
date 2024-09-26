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
    tension: {
      0: Shade;
      1: Shade;
      2: Shade;
      3: Shade;
      4: Shade;
      5: Shade;
      6: Shade;
      7: Shade;
      8: Shade;
    };
    accent: {
      0: Shade;
      1: Shade;
      2: Shade;
      3: Shade;
      4: Shade;
      5: Shade;
      6: Shade;
      7: Shade;
      8: Shade;
    };
    danger: Color;
    primary: Color;
  };
}
