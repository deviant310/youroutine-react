import {
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
  FlexCSS,
  FlexStyledProps,
  Grid,
  Paper,
  Textbox,
  ClickableProps,
  TextboxSize,
  FieldTextboxCSS,
  FieldsetElement,
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
  selectedOption,
  setSelectedOption,
  adornmentStart,
  textboxValue,
  setTextboxValue,
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

  const onOptionSelect = useCallback(
    (option: OptionData | null) => {
      setSelectedOption(option);

      setTextboxValue?.("");

      setDropdownToggleValue(false);
    },
    [setSelectedOption, setTextboxValue],
  );

  const { stringForSelectedOption, optionsProps } = useSelectInput({
    displayStringForOption,
    getOptionKey,
    options,
    selectedOption,
    onOptionSelect,
  });

  const textboxInvalid = Boolean(error);
  const textboxPlaceholder = stringForSelectedOption || fieldTextboxPlaceholder;
  const textboxPlaceholderMuted = !stringForSelectedOption;

  const onContainerBlur = useCallback(
    (event: FocusEvent<ContainerElement>) => {
      const { currentTarget, relatedTarget } = event;

      if (currentTarget.contains(relatedTarget)) return;

      setTextboxValue?.("");

      setDropdownToggleValue(false);

      onFieldContainerBlur?.(event);
    },
    [onFieldContainerBlur, setTextboxValue],
  );

  const onCleanerClick = useCallback(() => {
    setTextboxValue?.("");

    setSelectedOption(null);
  }, [setSelectedOption, setTextboxValue]);

  const renderOption = useCallback<OptionRenderer>(
    ({ option, key, onClick }, ref) => (
      <Column key={key} ref={ref}>
        <Clickable
          onClick={onClick}
          role="option"
          disabled={selectedOption === option}
        >
          <Area paddingVertical={0.8} paddingHorizontal={1.6}>
            <FieldOption option={option} />
          </Area>
        </Clickable>
      </Column>
    ),
    [FieldOption, selectedOption],
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
              selectedOption && (
                <Cleaner
                  onClick={onCleanerClick}
                  onMouseDown={e => e.stopPropagation()}
                />
              )
            }
            invalid={textboxInvalid}
            setValue={setTextboxValue}
            onMouseDown={() => setDropdownToggleValue(true)}
            placeholder={textboxPlaceholder}
            placeholderMuted={textboxPlaceholderMuted}
            size={textboxSize}
            value={textboxValue}
            disabled={!setTextboxValue}
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

  cursor: ${({ disabled }) => disabled && "pointer"};
`;

const DropdownStyled = styled(animated(Area, "scale"))`
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const ErrorSlided = animated(FieldError, "slide");

const Cleaner = memo<ClickableProps>(props => (
  <ClickableFlexCircleStyled
    $size={2.4}
    $justifyContent="center"
    $alignItems="center"
    {...props}
  >
    <CloseIcon size={1.6} />
  </ClickableFlexCircleStyled>
));

const ClickableFlexCircleStyled = styled(Clickable)<
  TransientProps<FlexStyledProps & CircleStyledProps>
>`
  ${FlexCSS}
  ${CircleCSS}

  opacity: 0.2;
  transition: opacity 150ms;

  &:hover {
    opacity: 1;
  }
`;

export interface SelectFieldProps<OptionData> extends FieldProps {
  displayStringForOption?(option: OptionData): string;
  getOptionKey?(option: OptionData): string | number;
  options: OptionData[];
  selectedOption: OptionData | null;
  setSelectedOption(option: OptionData | null): void;
  dropdownToggleInitialValue?: boolean;
  optionComponent: SelectFieldOptionComponent<OptionData>;
  adornmentStart?: ReactNode;
  textboxValue?: string;
  setTextboxValue?(value: string): void;
  textboxSize?: TextboxSize;
  textboxPlaceholder?: string;
  onContainerBlur?(event: FocusEvent<HTMLDivElement>): void;
}

interface SelectFieldPropsWithHTMLAttributes<OptionData>
  extends Omit<FieldsetHTMLAttributes<FieldsetElement>, "name">,
    SelectFieldProps<OptionData> {}

export type SelectFieldOptionComponent<OptionData> = FC<{
  option: OptionData;
}>;

type ContainerElement = ElementRef<typeof ContainerStyled>;
