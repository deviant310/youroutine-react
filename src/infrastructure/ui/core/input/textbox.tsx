import { HTMLAttributes, ReactNode, Ref } from "react";

import styled from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export function Textbox({
  children,
  before,
  after,
  size,
  invalid,
  implicit,
  clickable,
  ...props
}: TextboxProps) {
  return (
    <TextboxStyled
      $size={size}
      $invalid={invalid}
      $implicit={implicit}
      $clickable={clickable}
      {...props}
    >
      <RowStyled>
        {before && (
          <AdornmentContainerStyled>
            <AdornmentStyled>{before}</AdornmentStyled>
          </AdornmentContainerStyled>
        )}

        {children}

        {after && (
          <AdornmentContainerStyled>
            <AdornmentStyled>{after}</AdornmentStyled>
          </AdornmentContainerStyled>
        )}
      </RowStyled>
    </TextboxStyled>
  );
}

const TextboxStyled = styled.div.attrs({
  role: "textbox",
})<TextboxStyledProps>`
  display: inline-block;
  width: ${({ $size }) => {
    if (typeof $size === "number") return `${$size}ch`;
    if ($size === "auto") return "100%";
  }};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "text")};
  background-color: ${({ theme, $implicit }) =>
    !$implicit && theme.colors.main};
  padding: ${getUnitWithMeasure(0.8)} ${getUnitWithMeasure(1.6)};
  border-radius: ${getUnitWithMeasure(0.8)};
  transition-duration: 150ms;
  transition-property: background-color, box-shadow;

  box-shadow: ${({ theme, $invalid, $implicit }) =>
    `0 0 0 2px inset ${
      $implicit
        ? "transparent"
        : $invalid
          ? theme.colors.error[1].filled()
          : theme.colors.default[7].filled()
    }`};

  &:hover {
    background-color: ${({ theme }) => theme.colors.main};
    box-shadow: ${({ theme, $invalid }) =>
      `0 0 0 2px inset ${
        $invalid
          ? theme.colors.error[1].filled()
          : theme.colors.default[7].filled()
      }`};
  }

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.main};
    box-shadow: 0 0 0 2px inset
      ${({ $invalid, theme }) =>
        $invalid
          ? theme.colors.error[1].filled()
          : theme.colors.primary[2].filled()};
  }
`;

const RowStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${getUnitWithMeasure(0.8)};
`;

const AdornmentContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1 0 ${getUnitWithMeasure(2.4)};
  height: ${getUnitWithMeasure(2.4)};
`;

const AdornmentStyled = styled.div`
  position: absolute;
`;

export interface TextboxProps extends HTMLAttributes<TextboxElement> {
  before?: ReactNode;
  after?: ReactNode;
  size?: TextboxSize;
  invalid?: boolean;
  implicit?: boolean;
  clickable?: boolean;
  ref?: Ref<TextboxElement>;
}

export type TextboxStyledProps = TransientProps<
  Pick<TextboxProps, "size" | "invalid" | "implicit" | "clickable">
>;

export type TextboxElement = HTMLDivElement;

export type TextboxSize = number | "auto";
