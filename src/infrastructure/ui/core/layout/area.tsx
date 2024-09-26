import {
  FocusEvent,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  memo,
  ReactNode,
  RefAttributes,
  useCallback,
} from "react";

import { styled } from "styled-components";

import {
  UnitMultiplier,
  getUnitWithMeasure,
  TransientProps,
} from "../../helpers";

export const Area: AreaComponent = memo(
  forwardRef((props, ref) => {
    const {
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
      fillAvailableWidth,
      fillAvailableHeight,
      onBlur,
      ...restProps
    }: AreaCustomProps & AreaElementProps = props;

    const onAreaBlur = useCallback(
      (event: FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;

        onBlur?.(event);
      },
      [onBlur],
    );

    return (
      <AreaStyled
        ref={ref}
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
        $fillAvailableWidth={fillAvailableWidth}
        $fillAvailableHeight={fillAvailableHeight}
        onBlur={onAreaBlur}
        {...restProps}
      />
    );
  }),
);

Area.displayName = "Area";

const AreaStyled = styled.div.attrs<AreaStyledProps>(({ $position }) => ({
  ...($position === "relative" && { tabIndex: -1 }),
}))`
  position: ${({ $position }) => $position};
  top: ${({ $top }) => getUnitWithMeasure($top)};
  bottom: ${({ $bottom }) => getUnitWithMeasure($bottom)};
  right: ${({ $right }) => getUnitWithMeasure($right)};
  left: ${({ $left }) => getUnitWithMeasure($left)};

  width: ${({ $fillAvailableWidth, $width }) =>
    $fillAvailableWidth
      ? "-webkit-fill-available"
      : getUnitWithMeasure($width)};

  height: ${({ $fillAvailableHeight, $height }) =>
    $fillAvailableHeight
      ? "-webkit-fill-available"
      : getUnitWithMeasure($height)};

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

export interface AreaComponent
  extends Omit<
    ForwardRefExoticComponent<AreaCustomProps & RefAttributes<HTMLDivElement>>,
    number
  > {
  (props: AreaConcreteSizesProps & AreaElementProps): ReactNode;
  (props: AreaMaxSizesProps & AreaElementProps): ReactNode;
  (props: AreaAutoSizesProps & AreaElementProps): ReactNode;
  (props: AreaMaxWidthAndConcreteHeightProps & AreaElementProps): ReactNode;
  (props: AreaMaxHeightAndConcreteWidthProps & AreaElementProps): ReactNode;
  (props: AreaConcreteWidthAndAutoHeightProps & AreaElementProps): ReactNode;
  (props: AreaMaxWidthAndAutoHeightProps & AreaElementProps): ReactNode;
  (props: AreaConcreteHeightAndAutoWidthProps & AreaElementProps): ReactNode;
  (props: AreaMaxHeightAndAutoWidthProps & AreaElementProps): ReactNode;
}

interface AreaBaseProps {
  position?: "absolute" | "relative" | "fixed" | "sticky";
  top?: string | UnitMultiplier;
  bottom?: string | UnitMultiplier;
  right?: string | UnitMultiplier;
  left?: string | UnitMultiplier;
  margin?: string | UnitMultiplier;
  marginBottom?: string | UnitMultiplier;
  marginLeft?: string | UnitMultiplier;
  marginRight?: string | UnitMultiplier;
  marginTop?: string | UnitMultiplier;
  marginHorizontal?: string | UnitMultiplier;
  marginVertical?: string | UnitMultiplier;
  padding?: string | UnitMultiplier;
  paddingBottom?: string | UnitMultiplier;
  paddingLeft?: string | UnitMultiplier;
  paddingRight?: string | UnitMultiplier;
  paddingTop?: string | UnitMultiplier;
  paddingHorizontal?: string | UnitMultiplier;
  paddingVertical?: string | UnitMultiplier;
}

export type AreaElementProps = HTMLAttributes<HTMLDivElement>;

export interface AreaConcreteSizesProps extends AreaBaseProps {
  width?: string | UnitMultiplier;
  height?: string | UnitMultiplier;
}

export interface AreaMaxSizesProps extends AreaBaseProps {
  maxWidth?: string | UnitMultiplier;
  maxHeight?: string | UnitMultiplier;
}

export interface AreaAutoSizesProps extends AreaBaseProps {
  fillAvailableWidth?: boolean;
  fillAvailableHeight?: boolean;
}

export interface AreaMaxWidthAndConcreteHeightProps extends AreaBaseProps {
  maxWidth?: string | UnitMultiplier;
  height?: string | UnitMultiplier;
}

export interface AreaMaxHeightAndConcreteWidthProps extends AreaBaseProps {
  maxHeight?: string | UnitMultiplier;
  width?: string | UnitMultiplier;
}

export interface AreaConcreteWidthAndAutoHeightProps extends AreaBaseProps {
  width?: string | UnitMultiplier;
  fillAvailableHeight?: boolean;
}

export interface AreaMaxWidthAndAutoHeightProps extends AreaBaseProps {
  maxWidth?: string | UnitMultiplier;
  fillAvailableHeight?: boolean;
}

export interface AreaConcreteHeightAndAutoWidthProps extends AreaBaseProps {
  height?: string | UnitMultiplier;
  fillAvailableWidth?: boolean;
}

export interface AreaMaxHeightAndAutoWidthProps extends AreaBaseProps {
  maxHeight?: string | UnitMultiplier;
  fillAvailableWidth?: boolean;
}

export type AreaCustomProps = AreaConcreteSizesProps &
  AreaMaxSizesProps &
  AreaAutoSizesProps &
  AreaMaxWidthAndConcreteHeightProps &
  AreaMaxHeightAndConcreteWidthProps &
  AreaConcreteWidthAndAutoHeightProps &
  AreaMaxWidthAndAutoHeightProps &
  AreaConcreteHeightAndAutoWidthProps &
  AreaMaxHeightAndAutoWidthProps;

export type AreaStyledProps = TransientProps<AreaCustomProps>;
