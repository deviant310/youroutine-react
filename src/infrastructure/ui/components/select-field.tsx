import {
  ChangeEvent,
  ElementRef,
  FC,
  FieldsetHTMLAttributes,
  FocusEvent,
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
  CloseIcon,
  Column,
  ColumnElement,
  FieldError,
  FieldLabel,
  FieldProps,
  Fieldset,
  Grid,
  Paper,
  Textbox,
  TextboxSize,
  FieldTextboxCSS,
  FieldsetElement,
  TextboxInputElement,
} from "../core";
import { TransientProps } from "../helpers";

export const SelectField = memo(function <OptionData>({
  name,
  label,
  error,
  optionComponent: FieldOption,
  displayStringForOption,
  dropdownToggleInitialValue = false,
  getOptionKey,
  options,
  value,
  onChange,
  adornmentStart,
  textboxValue,
  onTextboxChange: onFieldTextboxChange,
  textboxSize,
  textboxPlaceholder: fieldTextboxPlaceholder,
  onContainerBlur: onFieldContainerBlur,
  ...props
}: SelectFieldPropsWithHTMLAttributes<OptionData>) {
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

      onFieldTextboxChange?.("");

      hideDropdown();
    },
    [hideDropdown, onChange, onFieldTextboxChange],
  );

  const { stringForSelectedOption, optionsProps } = useSelectInput({
    displayStringForOption,
    getOptionKey,
    options,
    selectedOption: value,
    onOptionSelect,
  });

  const textboxInvalid = Boolean(error);
  const textboxPlaceholder = stringForSelectedOption || fieldTextboxPlaceholder;
  const textboxPlaceholderMuted = !stringForSelectedOption;
  const textboxReadOnly = !onFieldTextboxChange;

  const onContainerBlur = useCallback(
    (event: FocusEvent<ContainerElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      onFieldTextboxChange?.("");

      hideDropdown();

      onFieldContainerBlur?.(event);
    },
    [hideDropdown, onFieldContainerBlur, onFieldTextboxChange],
  );

  const onTextboxChange = useCallback(
    ({ target }: ChangeEvent<TextboxInputElement>) => {
      onFieldTextboxChange?.(target.value);
    },
    [onFieldTextboxChange],
  );

  const onCleanerClick = useCallback(() => {
    onFieldTextboxChange?.("");

    onChange?.(null);
  }, [onChange, onFieldTextboxChange]);

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
            <FieldOption option={option} />
          </Area>
        </Clickable>
      </Column>
    ),
    [FieldOption, value],
  );

  return (
    <Fieldset {...props}>
      <ErrorSlided>{error}</ErrorSlided>

      <Grid gap={0.4}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <ContainerStyled onBlur={onContainerBlur}>
          <TextboxStyled
            name={name}
            before={adornmentStart}
            after={
              value && (
                <ClickableCircleStyled $size={2.4} onClick={onCleanerClick}>
                  <CloseIcon size={1.6} />
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
      </Grid>
    </Fieldset>
  );
});

const ContainerStyled = styled.div.attrs({
  role: "group",
  tabIndex: -1,
})`
  position: relative;
`;

const TextboxStyled = styled(Textbox)`
  ${FieldTextboxCSS};

  cursor: ${({ disabled, readOnly }) => (disabled || readOnly) && "pointer"};
`;

const DropdownStyled = styled(animated(Area, "scale"))`
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const ErrorSlided = animated(FieldError, "slide");

const ClickableCircleStyled = styled(Clickable).attrs({
  rippleable: true,
  hoverable: true,
})<TransientProps<CircleStyledProps>>`
  ${CircleCSS};

  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 150ms;
  transition-property: opacity;
  background-color: ${({ theme }) => theme.colors.default[8].transparent()};
  color: ${({ theme }) => theme.colors.default[2].filled()};
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export interface SelectFieldProps<OptionData> extends FieldProps {
  displayStringForOption?(option: OptionData): string;
  getOptionKey?(option: OptionData): string | number;
  options: OptionData[];
  value: OptionData | null;
  onChange?(option: OptionData | null): void;
  dropdownToggleInitialValue?: boolean;
  optionComponent: SelectFieldOptionComponent<OptionData>;
  adornmentStart?: ReactNode;
  textboxValue?: string;
  onTextboxChange?(value: string): void;
  textboxSize?: TextboxSize;
  textboxPlaceholder?: string;
  onContainerBlur?(event: FocusEvent<HTMLDivElement>): void;
}

interface SelectFieldPropsWithHTMLAttributes<OptionData>
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "name" | "onChange">,
    SelectFieldProps<OptionData> {}

export type SelectFieldOptionComponent<OptionData> = FC<{
  option: OptionData;
}>;

type ContainerElement = ElementRef<typeof ContainerStyled>;
