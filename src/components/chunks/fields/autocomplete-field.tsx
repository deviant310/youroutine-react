import { AutocompleteField as ReactFormAutocompleteField } from 'react-form';

import { Expanded, Relative } from '../../../../libs/react-styled-ui/layout';

import { PopUp } from '../../../../libs/react-styled-ui/surfaces';

export const AutocompleteField: AutocompleteField.Component = props => {
  return (
    <ReactFormAutocompleteField
      {...props}
      containerComponent={AutocompleteFieldContainer}
      dropdownComponent={AutocompleteFieldDropdown}
    />
  );
};

const AutocompleteFieldContainer = (props: ReactFormAutocompleteField.ContainerProps) => (
  <Expanded>
    <Relative {...props}/>
  </Expanded>
);

const AutocompleteFieldDropdown = (props: ReactFormAutocompleteField.DropdownProps) => (
  <PopUp elevation={1} fullWidth={true} {...props}/>
);

export namespace AutocompleteField {
  export interface Component {
    <Name extends string, Option> (props: Props<Name, Option>): JSX.Element;
  }

  type OmitProps =
    | 'containerComponent'
    | 'dropdownComponent';

  export type Props<Key extends string, Option> = Omit<ReactFormAutocompleteField.Props<Key, Option>, OmitProps>;

  export type InputProps = ReactFormAutocompleteField.InputProps;

  export type OptionProps<Option> = ReactFormAutocompleteField.OptionProps<Option>;
}
