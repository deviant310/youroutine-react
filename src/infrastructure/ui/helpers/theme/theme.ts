import { Shade } from "./shade";

export interface Theme {
  colors: {
    main: string;
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
    primary: {
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
    secondary: {
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
    error: {
      0: Shade;
      1: Shade;
    };
  };
}
