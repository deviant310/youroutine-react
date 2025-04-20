import {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  memo,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useRef,
  useState,
} from "react";

import {
  SelectInputOptionProps,
  VirtualList,
  VirtualListItemRenderer,
  useSelectInput,
} from "react-inputs/select-input";
import { styled } from "styled-components";

import {
  animated,
  Area,
  CircleCSS,
  Clickable,
  Column,
  ColumnElement,
  Icon,
  Paper,
  Textbox,
  Input,
  TextboxProps,
  InputProps,
  InputElement,
  TextboxElement,
  CircleStyledProps,
} from "../core";
import { TransientProps } from "../utils";

export const SelectInput = memo(function <OptionData>({
  name,
  renderOption,
  displayStringForOption,
  dropdownToggleInitialValue = false,
  getOptionKey,
  options,
  value,
  onChange,
  before,
  searchValue: inputValue,
  onSearchChange,
  onBlur,
  disabled,
  placeholder,
  size,
  implicit,
  invalid,
  ...props
}: SelectInputProps<OptionData>) {
  type VirtualListOptionRenderer = VirtualListItemRenderer<
    ColumnElement,
    SelectInputOptionProps<OptionData>
  >;

  const inputRef = useRef<InputElement>(null);

  const [dropdownToggleOn, setDropdownToggleValue] = useState(
    dropdownToggleInitialValue,
  );

  const onOptionSelect = useCallback(
    (option: OptionData | null) => {
      onChange?.(option);

      onSearchChange?.("");

      setDropdownToggleValue(false);
    },
    [onChange, onSearchChange],
  );

  const { stringForSelectedOption, optionsProps } = useSelectInput({
    displayStringForOption,
    getOptionKey,
    options,
    selectedOption: value,
    onOptionSelect,
  });

  const inputPlaceholder = stringForSelectedOption || placeholder;
  const inputPlaceholderMuted = !stringForSelectedOption;

  const onContainerBlur = useCallback(
    (event: FocusEvent<ContainerElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      onSearchChange?.("");

      setDropdownToggleValue(false);

      onBlur?.(event);
    },
    [onBlur, onSearchChange],
  );

  const onTextboxMouseDown = useCallback(
    (event: MouseEvent<TextboxElement>) => {
      const { target, currentTarget } = event;

      if (target !== currentTarget) return;

      setTimeout(() => inputRef.current?.focus(), 0);
    },
    [],
  );

  const onTextboxFocus = useCallback(() => {
    setDropdownToggleValue(true);
  }, []);

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<InputElement>) => {
      onSearchChange?.(target.value);
    },
    [onSearchChange],
  );

  const onCleanerClick = useCallback(() => {
    onSearchChange?.("");

    onChange?.(null);
  }, [onChange, onSearchChange]);

  const renderVirtualListOption = useCallback<VirtualListOptionRenderer>(
    ({ option, key, onClick }, ref) => (
      <Column key={key} ref={ref}>
        <Clickable
          onClick={onClick}
          role="option"
          disabled={value === option}
          rippleable
          hoverable
        >
          <Area paddingVertical={0.8} paddingHorizontal={1.6}>
            {renderOption?.(option) ?? `${option}`}
          </Area>
        </Clickable>
      </Column>
    ),
    [renderOption, value],
  );

  return (
    <ContainerStyled onBlur={onContainerBlur} {...props}>
      <TextboxStyled
        before={before}
        after={
          value && (
            <ClickableCircleStyled
              $diameter={2.4}
              $implicit={implicit}
              onClick={onCleanerClick}
            >
              <Icon type="close" size="normal" />
            </ClickableCircleStyled>
          )
        }
        onFocus={onTextboxFocus}
        onMouseDown={onTextboxMouseDown}
        size={size}
        invalid={invalid}
        implicit={implicit}
        clickable={!onSearchChange}
      >
        <InputStyled
          ref={inputRef}
          name={name}
          value={inputValue}
          onChange={onInputChange}
          disabled={disabled}
          readOnly={!onSearchChange}
          placeholder={inputPlaceholder}
          placeholderMuted={inputPlaceholderMuted}
        />
      </TextboxStyled>

      <DropdownStyled>
        {optionsProps && optionsProps.length > 0 && dropdownToggleOn && (
          <Paper elevation={1}>
            <Area paddingVertical={0.8}>
              <VirtualList
                items={optionsProps}
                renderItem={renderVirtualListOption}
              />
            </Area>
          </Paper>
        )}
      </DropdownStyled>
    </ContainerStyled>
  );
});

const ClickableCircleStyled = styled(Clickable).attrs({
  rippleable: true,
  hoverable: true,
})<ClickableCircleStyledProps>`
  ${CircleCSS};

  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 150ms;
  transition-property: opacity;
  background-color: ${({ theme }) => theme.colors.default[8].transparent()};
  color: ${({ theme }) => theme.colors.default[2].filled()};
  opacity: ${({ $implicit }) => ($implicit ? 0 : 0.5)};

  &:hover {
    opacity: 1;
  }
`;

const ContainerStyled = styled.div.attrs({ role: "group", tabIndex: -1 })`
  position: relative;
`;

type ContainerElement = HTMLDivElement;

const InputStyled = styled(Input)``;

const TextboxStyled = styled(Textbox)`
  ${InputStyled} {
    width: 100%;
    cursor: ${({ clickable }) => clickable && "pointer"};
  }

  &:hover {
    ${ClickableCircleStyled} {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }

  &:focus-within {
    ${ClickableCircleStyled} {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const DropdownStyled = styled(animated(Area, "scale"))`
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export interface SelectInputProps<OptionData>
  extends Omit<HTMLAttributes<SelectInputElement>, "onChange">,
    Pick<TextboxProps, "before" | "size" | "implicit" | "invalid">,
    Pick<InputProps, "name" | "disabled" | "placeholder"> {
  displayStringForOption?(option: OptionData): string;
  getOptionKey?(option: OptionData): string | number;
  options: OptionData[];
  value: OptionData | null;
  onChange?(option: OptionData | null): void;
  dropdownToggleInitialValue?: boolean;
  renderOption?(option: OptionData): ReactNode;
  searchValue?: string;
  onSearchChange?(value: string): void;
  ref?: Ref<SelectInputElement>;
}

type ClickableCircleStyledProps = CircleStyledProps &
  TransientProps<{
    implicit?: boolean;
  }>;

export type SelectInputElement = HTMLDivElement;
