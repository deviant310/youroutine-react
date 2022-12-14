import Palette from '../../palette';

const ThemeDark = {
  colors: {
    bodyBackground: Palette.glacierWhite.darker,
    buttonContainedActiveRippleBackground: `${Palette.glacierWhite.lightest}4d`,
    buttonContainedBackground: Palette.blueberryBuckle.normal,
    buttonContainedHoveredBackground: Palette.blueberryBuckle.darker,
    buttonContainedShadow: `${Palette.enchantedNavy.normal}cc`,
    clickableActiveRippleBackground: `${Palette.ceil.lightest}4d`,
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
  }
};

export default ThemeDark;
