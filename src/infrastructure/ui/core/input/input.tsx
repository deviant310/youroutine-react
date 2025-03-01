import { useCallback, useEffect, Ref, InputHTMLAttributes } from "react";

import { styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export function Input({
  name,
  value,
  onChange,
  disabled,
  readOnly,
  placeholder,
  placeholderMuted = true,
  ref,
  ...props
}: InputPropsWithHTMLAttributes) {
  /* const { current: element } = ref && typeof ref === "object" ? ref : {};

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.target === element) setTimeout(() => element?.focus(), 0);
    },
    [element],
  );

  useEffect(() => {
    element?.addEventListener("mousedown", onMouseDown);

    return () => element?.removeEventListener("mousedown", onMouseDown);
  }, [element, onMouseDown]);  */

  return (
    <InputStyled
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      $placeholderMuted={placeholderMuted}
      ref={ref}
      {...props}
    />
  );
}

export const InputStyled = styled.input<InputStyledProps>`
  height: ${getUnitWithMeasure(2.4)};
  padding: 0;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme, $placeholderMuted }) =>
      $placeholderMuted ? theme.colors.default[3].filled() : "inherit"};
  }
`;

export interface InputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholderMuted?: boolean;
  ref?: Ref<InputElement>;
}

type InputStyledProps = TransientProps<Pick<InputProps, "placeholderMuted">>;

export type InputElement = HTMLInputElement;

interface InputPropsWithHTMLAttributes
  extends Omit<InputHTMLAttributes<InputElement>, "value">,
    InputProps {}
