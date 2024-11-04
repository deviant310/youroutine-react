import {
  memo,
  useCallback,
  useRef,
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ElementRef,
  useEffect,
} from "react";

import { styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../helpers";

export const Textbox = memo<TextboxPropsWithHTMLAttributes>(
  ({
    name,
    value,
    setValue,
    before,
    after,
    invalid,
    disabled,
    size,
    placeholder,
    placeholderMuted = true,
    ...props
  }) => {
    const ref = useRef<TextboxElement>(null);
    const inputRef = useRef<TextboxInputElement>(null);

    const onChange = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValue?.(target.value);
      },
      [setValue],
    );

    const onMouseDown = useCallback(
      () => setTimeout(() => inputRef.current?.focus(), 0),
      [],
    );

    useEffect(() => {
      const { current: element } = ref;

      element?.addEventListener("mousedown", onMouseDown);

      return () => element?.removeEventListener("mousedown", onMouseDown);
    }, [onMouseDown]);

    return (
      <TextboxStyled $invalid={invalid} $size={size} {...props} ref={ref}>
        <RowStyled>
          {before && (
            <AdornmentContainerStyled>
              <AdornmentStyled>{before}</AdornmentStyled>
            </AdornmentContainerStyled>
          )}

          <InputStyled
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            $placeholderMuted={placeholderMuted}
            $size={size}
            ref={inputRef}
          />

          {after && (
            <AdornmentContainerStyled>
              <AdornmentStyled>{after}</AdornmentStyled>
            </AdornmentContainerStyled>
          )}
        </RowStyled>
      </TextboxStyled>
    );
  },
);

Textbox.displayName = "Textbox";

const TextboxStyled = styled.div.attrs({ role: "textbox" })<
  TransientProps<TextboxStyledProps>
>`
  width: ${({ $size }) => $size === "auto" && "100%"};
  display: inline-block;
  cursor: text;
  background-color: ${({ theme }) => theme.colors.default[9].filled()};
  padding: ${getUnitWithMeasure(0.8)} ${getUnitWithMeasure(1.6)};
  border-radius: ${getUnitWithMeasure(0.8)};
  transition: box-shadow 150ms;
  box-shadow: 0 0 0 2px inset
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger.hex() : theme.colors.default[7].filled()};

  &:focus-within {
    box-shadow: 0 0 0 2px inset
      ${({ $invalid, theme }) =>
        $invalid
          ? theme.colors.danger.hex()
          : theme.colors.tension[2].filled()};
  }
`;

const RowStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${getUnitWithMeasure(0.8)};
`;

const InputStyled = styled.input<TransientProps<TextboxStyledProps>>`
  width: ${({ $size }) => {
    if (typeof $size === "number") return `${$size}ch`;
    if ($size === "auto") return "100%";
  }};
  height: ${getUnitWithMeasure(2.4)};
  padding: 0;
  border: none;
  outline: none;
  pointer-events: ${({ disabled }) => disabled && "none"};

  &::placeholder {
    color: ${({ theme, $placeholderMuted }) =>
      $placeholderMuted ? theme.colors.default[3].filled() : "inherit"};
  }
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

export interface TextboxStyledProps {
  invalid?: boolean;
  size?: TextboxSize;
  placeholderMuted?: boolean;
}

export interface TextboxProps extends TextboxStyledProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  before?: ReactNode;
  after?: ReactNode;
  value?: string;
  setValue?(value: string): void;
}

export type TextboxElement = ElementRef<typeof TextboxStyled>;
export type TextboxInputElement = ElementRef<typeof InputStyled>;

interface TextboxPropsWithHTMLAttributes
  extends HTMLAttributes<TextboxElement>,
    TextboxProps {}

export type TextboxSize = number | "auto";
