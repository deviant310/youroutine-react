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

import { FixedSize, getUnitWithMeasure, TransientProps } from "../../helpers";

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
  top?: string | FixedSize;
  bottom?: string | FixedSize;
  right?: string | FixedSize;
  left?: string | FixedSize;
  margin?: string | FixedSize;
  marginBottom?: string | FixedSize;
  marginLeft?: string | FixedSize;
  marginRight?: string | FixedSize;
  marginTop?: string | FixedSize;
  marginHorizontal?: string | FixedSize;
  marginVertical?: string | FixedSize;
  padding?: string | FixedSize;
  paddingBottom?: string | FixedSize;
  paddingLeft?: string | FixedSize;
  paddingRight?: string | FixedSize;
  paddingTop?: string | FixedSize;
  paddingHorizontal?: string | FixedSize;
  paddingVertical?: string | FixedSize;
}

export type AreaElementProps = HTMLAttributes<HTMLDivElement>;

export interface AreaConcreteSizesProps extends AreaBaseProps {
  width?: string | FixedSize;
  height?: string | FixedSize;
}

export interface AreaMaxSizesProps extends AreaBaseProps {
  maxWidth?: string | FixedSize;
  maxHeight?: string | FixedSize;
}

export interface AreaAutoSizesProps extends AreaBaseProps {
  fillAvailableWidth?: boolean;
  fillAvailableHeight?: boolean;
}

export interface AreaMaxWidthAndConcreteHeightProps extends AreaBaseProps {
  maxWidth?: string | FixedSize;
  height?: string | FixedSize;
}

export interface AreaMaxHeightAndConcreteWidthProps extends AreaBaseProps {
  maxHeight?: string | FixedSize;
  width?: string | FixedSize;
}

export interface AreaConcreteWidthAndAutoHeightProps extends AreaBaseProps {
  width?: string | FixedSize;
  fillAvailableHeight?: boolean;
}

export interface AreaMaxWidthAndAutoHeightProps extends AreaBaseProps {
  maxWidth?: string | FixedSize;
  fillAvailableHeight?: boolean;
}

export interface AreaConcreteHeightAndAutoWidthProps extends AreaBaseProps {
  height?: string | FixedSize;
  fillAvailableWidth?: boolean;
}

export interface AreaMaxHeightAndAutoWidthProps extends AreaBaseProps {
  maxHeight?: string | FixedSize;
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
