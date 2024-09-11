import Color from "color";

export class Shade {
  constructor(
    private hex: string,
    private opacity: number,
    private substrate = "white",
  ) {}

  filled() {
    return Color(this.substrate).mix(Color(this.hex), this.opacity).hexa();
  }

  transparent() {
    return Color(this.hex)
      .fade(1 - this.opacity)
      .hexa();
  }
}
