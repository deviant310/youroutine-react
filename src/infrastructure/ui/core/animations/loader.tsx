import { HTMLAttributes, memo } from "react";

import { keyframes, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../utils";

export const Loader = memo<LoaderProps>(({ size, ...props }) => (
  <LoaderStyled $size={size} {...props} />
));

const rotatingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const squeezingAnimation = keyframes`
  0% {
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 54%);
  }
  10% {
    clip-path: polygon(50% 50%, 100% 60%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%);
  }
  20% {
    clip-path: polygon(50% 50%, 100% 70%, 100% 100%, 0 100%, 0 100%, 0 100%, 0 100%);
  }
  30% {
    clip-path: polygon(50% 50%, 100% 80%, 100% 100%, 0 100%, 0 0, 0 0, 0 0);
  }
  40% {
    clip-path: polygon(50% 50%, 100% 90%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%);
  }
  60% {
    clip-path: polygon(50% 50%, 0 100%, 0 100%, 0 100%, 0 0, 100% 0, 100% 50%);
  }
  70% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 100% 0, 100% 50%);
  }
  80% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 50%);
  }
  90% {
    clip-path: polygon(50% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%);
  }
  100% {
    clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 54%);
  }
`;

const LoaderStyled = styled.div<LoaderStyledProps>`
  display: inline-block;
  width: ${({ $size }) => getUnitWithMeasure($size)};
  height: ${({ $size }) => getUnitWithMeasure($size)};
  border-radius: 50%;
  border-style: solid;
  border-width: ${getUnitWithMeasure(0.2)};
  animation:
    ${squeezingAnimation} 1.4s linear infinite,
    ${rotatingAnimation} 1.4s linear infinite;
`;

export interface LoaderProps extends HTMLAttributes<LoaderElement> {
  size: UnitIndex;
}

export type LoaderStyledProps = TransientProps<Pick<LoaderProps, "size">>;

export type LoaderElement = HTMLDivElement;
