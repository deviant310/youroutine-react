import Palette from '../../palette';

const ThemeLight = {
  colors: {
    bodyBackground: Palette.glacierWhite.darker,
    buttonContainedActiveRippleBackground: `${Palette.glacierWhite.lightest}4d`,
    buttonContainedBackground: Palette.blueberryBuckle.normal,
    buttonContainedHoveredBackground: Palette.blueberryBuckle.darker,
    buttonContainedShadow: `${Palette.enchantedNavy.normal}cc`,
    clickableActiveRippleBackground: Palette.firstSnow.normal,
    clickableBackground: Palette.glacierWhite.lighter,
    clickableHoveredBackground: Palette.glacierWhite.darker,
    icon: Palette.manatee.lightest,
    inputFilledBackground: Palette.glacierWhite.darkest,
    inputFilledBorder: Palette.firstSnow.normal,
    inputFilledFocusedBackground: Palette.glacierWhite.darkest,
    inputFilledFocusedBorder: Palette.blueberryBuckle.normal,
    inputStandardBorder: Palette.glacierWhite.darkest,
    inputStandardFocusedBorder: Palette.blueberryBuckle.normal,
    logoBackground: Palette.blueberryBuckle.normal,
    surfaceBackground: Palette.glacierWhite.lighter,
    surfaceShadow: `${Palette.blueberryBuckle.normal}33`,
    text: Palette.enchantedNavy.normal,
    textInverted: Palette.glacierWhite.normal,
    textMuted: `${Palette.enchantedNavy.normal}4d`
  }
};

export default ThemeLight;
