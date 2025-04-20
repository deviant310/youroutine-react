import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { TransientProps, UnitIndex, getUnitWithMeasure } from "../../utils";

export const Area = memo<AreaProps>(
  ({
    overflow,
    textOverflow,
    disabled,
    inline,
    alignContents,
    position,
    top,
    bottom,
    right,
    left,
    padding,
    paddingTop,
    paddingBottom,
    paddingVertical,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    margin,
    marginTop,
    marginBottom,
    marginVertical,
    marginLeft,
    marginRight,
    marginHorizontal,
    width,
    height,
    maxWidth,
    maxHeight,
    ...props
  }) => (
    <AreaStyled
      $overflow={overflow}
      $textOverflow={textOverflow}
      $disabled={disabled}
      $inline={inline}
      $alignContents={alignContents}
      $position={position}
      $top={top}
      $bottom={bottom}
      $right={right}
      $left={left}
      $padding={padding}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
      $paddingVertical={paddingVertical}
      $paddingLeft={paddingLeft}
      $paddingRight={paddingRight}
      $paddingHorizontal={paddingHorizontal}
      $margin={margin}
      $marginTop={marginTop}
      $marginBottom={marginBottom}
      $marginVertical={marginVertical}
      $marginLeft={marginLeft}
      $marginRight={marginRight}
      $marginHorizontal={marginHorizontal}
      $width={width}
      $height={height}
      $maxWidth={maxWidth}
      $maxHeight={maxHeight}
      {...props}
    />
  ),
);

Area.displayName = "Area";

export const AreaCSS = css<AreaStyledProps>`
  display: ${({ $inline }) => $inline && "inline-block"};
  align-content: ${({ $alignContents }) => $alignContents};
  overflow: ${({ $overflow }) => $overflow};
  text-overflow: ${({ $textOverflow }) => $textOverflow};
  pointer-events: ${({ $disabled }) => $disabled && "none"};
  position: ${({ $position }) => $position};
  top: ${({ $top }) => getUnitWithMeasure($top)};
  bottom: ${({ $bottom }) => getUnitWithMeasure($bottom)};
  right: ${({ $right }) => getUnitWithMeasure($right)};
  left: ${({ $left }) => getUnitWithMeasure($left)};
  width: ${({ $width }) => getUnitWithMeasure($width)};
  height: ${({ $height }) => getUnitWithMeasure($height)};
  max-width: ${({ $maxWidth }) => getUnitWithMeasure($maxWidth)};
  max-height: ${({ $maxHeight }) => getUnitWithMeasure($maxHeight)};

  padding-top: ${({ $paddingTop, $paddingVertical, $padding }) =>
    getUnitWithMeasure($paddingTop ?? $paddingVertical ?? $padding)};

  padding-bottom: ${({ $paddingBottom, $paddingVertical, $padding }) =>
    getUnitWithMeasure($paddingBottom ?? $paddingVertical ?? $padding)};

  padding-left: ${({ $paddingLeft, $paddingHorizontal, $padding }) =>
    getUnitWithMeasure(
      $paddingLeft ?? $paddingHorizontal ?? $padding,
    )?.toString()};

  padding-right: ${({ $paddingRight, $paddingHorizontal, $padding }) =>
    getUnitWithMeasure($paddingRight ?? $paddingHorizontal ?? $padding)};

  margin-top: ${({ $marginTop, $marginVertical, $margin }) =>
    getUnitWithMeasure($marginTop ?? $marginVertical ?? $margin)};

  margin-bottom: ${({ $marginBottom, $marginVertical, $margin }) =>
    getUnitWithMeasure($marginBottom ?? $marginVertical ?? $margin)};

  margin-left: ${({ $marginLeft, $marginHorizontal, $margin }) =>
    getUnitWithMeasure($marginLeft ?? $marginHorizontal ?? $margin)};

  margin-right: ${({ $marginRight, $marginHorizontal, $margin }) =>
    getUnitWithMeasure($marginRight ?? $marginHorizontal ?? $margin)};
`;

const AreaStyled = styled.div<AreaStyledProps>`
  ${AreaCSS};
`;

export interface AreaProps extends HTMLAttributes<AreaElement> {
  inline?: boolean;
  alignContents?: "center";
  position?: "absolute" | "relative" | "fixed" | "sticky";
  top?: string | UnitIndex;
  bottom?: string | UnitIndex;
  right?: string | UnitIndex;
  left?: string | UnitIndex;
  overflow?: "hidden" | "auto";
  textOverflow?: "ellipsis";
  disabled?: boolean;
  width?: string | UnitIndex;
  height?: string | UnitIndex;
  maxWidth?: string | UnitIndex;
  maxHeight?: string | UnitIndex;
  margin?: string | UnitIndex;
  marginBottom?: string | UnitIndex;
  marginLeft?: string | UnitIndex;
  marginRight?: string | UnitIndex;
  marginTop?: string | UnitIndex;
  marginHorizontal?: string | UnitIndex;
  marginVertical?: string | UnitIndex;
  padding?: string | UnitIndex;
  paddingBottom?: string | UnitIndex;
  paddingLeft?: string | UnitIndex;
  paddingRight?: string | UnitIndex;
  paddingTop?: string | UnitIndex;
  paddingHorizontal?: string | UnitIndex;
  paddingVertical?: string | UnitIndex;
}

export type AreaStyledProps = TransientProps<
  Pick<
    AreaProps,
    | "inline"
    | "alignContents"
    | "position"
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "overflow"
    | "textOverflow"
    | "disabled"
    | "width"
    | "height"
    | "maxWidth"
    | "maxHeight"
    | "margin"
    | "marginBottom"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginHorizontal"
    | "marginVertical"
    | "padding"
    | "paddingBottom"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingHorizontal"
    | "paddingVertical"
  >
>;

export type AreaElement = HTMLDivElement;
