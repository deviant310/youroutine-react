import {
  ChangeEvent,
  ElementRef,
  FC,
  FocusEvent,
  HTMLAttributes,
  memo,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { styled } from "styled-components";
import {
  SelectInputOptionProps,
  VirtualList,
  VirtualListItemRenderer,
  useSelectInput,
} from "use-react-input/select-input";

import {
  animated,
  Area,
  CircleCSS,
  CircleStyledProps,
  Clickable,
  Column,
  ColumnElement,
  Icon,
  Paper,
  Textbox,
  TextboxSize,
  TextboxInputElement,
} from "../../core";
import { TransientProps } from "../../helpers";

export const SelectInput = memo(function <OptionData>({
  name,
  optionComponent: InputOption,
  displayStringForOption,
  dropdownToggleInitialValue = false,
  getOptionKey,
  options,
  value,
  onChange,
  adornmentStart,
  implicit,
  textboxValue,
  onTextboxChange: onInputTextboxChange,
  textboxSize,
  textboxPlaceholder: inputTextboxPlaceholder,
  textboxInvalid,
  onBlur: onContainerBlur,
  ...props
}: SelectInputPropsWithHTMLAttributes<OptionData>) {
  type OptionRenderer = VirtualListItemRenderer<
    ColumnElement,
    SelectInputOptionProps<OptionData>
  >;

  const [dropdownToggleOn, setDropdownToggleValue] = useState(
    dropdownToggleInitialValue,
  );

  const showDropdown = useCallback(() => setDropdownToggleValue(true), []);
  const hideDropdown = useCallback(() => setDropdownToggleValue(false), []);

  const onOptionSelect = useCallback(
    (option: OptionData | null) => {
      onChange?.(option);

      onInputTextboxChange?.("");

      hideDropdown();
    },
    [hideDropdown, onChange, onInputTextboxChange],
  );

  const { stringForSelectedOption, optionsProps } = useSelectInput({
    displayStringForOption,
    getOptionKey,
    options,
    selectedOption: value,
    onOptionSelect,
  });

  const textboxPlaceholder = stringForSelectedOption || inputTextboxPlaceholder;
  const textboxPlaceholderMuted = !stringForSelectedOption;
  const textboxReadOnly = !onInputTextboxChange;

  const onBlur = useCallback(
    (event: FocusEvent<SelectInputElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      onInputTextboxChange?.("");

      hideDropdown();

      onContainerBlur?.(event);
    },
    [hideDropdown, onContainerBlur, onInputTextboxChange],
  );

  const onTextboxChange = useCallback(
    ({ target }: ChangeEvent<TextboxInputElement>) => {
      onInputTextboxChange?.(target.value);
    },
    [onInputTextboxChange],
  );

  const onCleanerClick = useCallback(() => {
    onInputTextboxChange?.("");

    onChange?.(null);
  }, [onChange, onInputTextboxChange]);

  const renderOption = useCallback<OptionRenderer>(
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
            {InputOption ? <InputOption option={option} /> : `${option}`}
          </Area>
        </Clickable>
      </Column>
    ),
    [InputOption, value],
  );

  return (
    <ContainerStyled onBlur={onBlur} {...props}>
      <TextboxStyled
        name={name}
        before={adornmentStart}
        after={
          value && (
            <ClickableCircleStyled
              $size={2.4}
              $implicit={implicit}
              onClick={onCleanerClick}
            >
              <Icon type="close" size="xsmall" />
            </ClickableCircleStyled>
          )
        }
        invalid={textboxInvalid}
        onChange={onTextboxChange}
        onFocus={showDropdown}
        placeholder={textboxPlaceholder}
        placeholderMuted={textboxPlaceholderMuted}
        size={textboxSize}
        value={textboxValue}
        readOnly={textboxReadOnly}
        implicit={implicit}
      />

      <DropdownStyled>
        {optionsProps && optionsProps.length > 0 && dropdownToggleOn && (
          <Paper elevation={1}>
            <Area paddingVertical={0.8}>
              <VirtualList items={optionsProps} renderItem={renderOption} />
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
})<TransientProps<ClickableCircleStyledProps>>`
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

const ContainerStyled = styled.div.attrs({
  role: "group",
  tabIndex: -1,
})`
  position: relative;
`;

const TextboxStyled = styled(Textbox)`
  cursor: ${({ readOnly }) => readOnly && "pointer"};

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

export interface SelectInputProps<OptionData> {
  name?: string;
  displayStringForOption?(option: OptionData): string;
  getOptionKey(option: OptionData): string | number;
  options: OptionData[];
  value: OptionData | null;
  onChange?(option: OptionData | null): void;
  dropdownToggleInitialValue?: boolean;
  optionComponent?: SelectInputOptionComponent<OptionData>;
  adornmentStart?: ReactNode;
  implicit?: boolean;
  textboxValue?: string;
  onTextboxChange?(value: string): void;
  textboxSize?: TextboxSize;
  textboxPlaceholder?: string;
  textboxInvalid?: boolean;
}

interface ClickableCircleStyledProps extends CircleStyledProps {
  implicit?: boolean;
}

interface SelectInputPropsWithHTMLAttributes<OptionData>
  extends Omit<HTMLAttributes<SelectInputElement>, "onChange">,
    SelectInputProps<OptionData> {}

export type SelectInputOptionComponent<OptionData> = FC<{
  option: OptionData;
}>;

export type SelectInputElement = ElementRef<typeof ContainerStyled>;
