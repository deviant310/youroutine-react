import React, { forwardRef } from 'react';

import { MaskedField, SelectField } from 'react-fields';

import { GlobeIcon, PhoneIcon } from '../../../concern/ui/icons';

import { Button, Clickable, Input } from '../../../concern/ui/interactive';

import { Area, Center, Column, Relative, Row } from '../../../concern/ui/layout';

import { PopUp } from '../../../concern/ui/surfaces';

import { Text } from '../../../concern/ui/typography';

import { Country, useLogin } from '../login-context';

const IdentificationForm = () => {
  const {
    stageState: [, setStage],
    identificationDataState: [{ country, phone }, setUserData]
  } = useLogin();

  return (
    <>
      <Center>
        <h2>Вход в YouRoutine</h2>
      </Center>

      <Area mb={3.5}/>

      <fieldset>
        <SelectField
          containerComponent={CountryFieldContainer}
          displayStringForOption={getCountryOptionTitle}
          dropdownComponent={CountryFieldDropdown}
          getOptionKey={getCountryOptionId}
          inputComponent={CountryFieldInput}
          label="Страна"
          name="country"
          optionComponent={CountryFieldOption}
          optionsBuilder={countriesOptionsBuilder}
          setValue={setUserData}
          setValueFromRecord
          value={country}
        />
      </fieldset>

      <Area mb={1.5}/>

      <fieldset>
        <MaskedField
          inputComponent={PhoneInput}
          label="Номер телефона"
          mask={country ? `+${country.code} ${country.phoneMask}` : ''}
          name="phone"
          setValue={setUserData}
          setValueFromRecord
          source={country ? String.raw`\+${country.code}|(\d)` : ''}
          value={phone}
        />
      </fieldset>

      <Area mb={3.5}/>

      <Column>
        <Button
          onClick={() => setStage('verification')}
          variant="contained"
        >
          Далее
        </Button>
      </Column>
    </>
  );
};

const CountryFieldInput: SelectField.InputComponent = forwardRef((props, ref) => (
  <Input
    adornment={<GlobeIcon/>}
    ref={ref}
    variant="standard"
    {...props}
  />
));

const CountryFieldOption: SelectField.OptionComponent<Country> = ({ data, ...props }) => {
  const { code, flag, title } = data;

  return (
    <Clickable {...props}>
      <Area px={1} py={.6}>
        <Row alignItems="center" gap={2} justifyContent="between">
          <Row alignItems="center" gap={1}>
            <Text size={1.8}>{flag}</Text>
            {' '}
            <Text>{title}</Text>
          </Row>

          <Text muted>+{code}</Text>
        </Row>
      </Area>
    </Clickable>
  );
};

const CountryFieldContainer: SelectField.ContainerComponent = props => (
  <Column>
    <Relative {...props}/>
  </Column>
);

const CountryFieldDropdown: SelectField.DropdownComponent = props => (
  <PopUp
    elevation={1}
    fillAvailableWidth
    {...props}
  />
);

const countriesOptions: Country[] = [
  { code: 7, flag: '🇷🇺', id: 1, phoneMask: '### ###-##-##', title: 'Russia' },
  { code: 995, flag: '🇬🇪', id: 2, phoneMask: '### ###-###', title: 'Georgia' },
  { code: 1, flag: '🇺🇸', id: 3, phoneMask: '### ### ####', title: 'USA' },
  { code: 49, flag: '🇩🇪', id: 4, phoneMask: '#### #######', title: 'Germany' },
  { code: 44, flag: '🇬🇧', id: 5, phoneMask: '#### ######', title: 'United Kingdom' },
  { code: 1268, flag: '🇦🇬', id: 6, phoneMask: '### ####', title: 'Antigua & Barbuda' }
]
  .sort(({ title: nextTitle }, { title: currentTitle }) => (
    nextTitle > currentTitle ? 1 : -1
  ));

const getCountryOptionTitle = ({ title }: Country) => title;
const getCountryOptionId = ({ id }: Country) => id;

const countriesOptionsBuilder = (editingValue: string) => (
  countriesOptions.filter(({ title }) => (
    title
      .toLowerCase()
      .includes(
        editingValue.toLowerCase()
      )
  ))
);

const PhoneInput: MaskedField.InputComponent = forwardRef((props, ref) => (
  <Input
    adornment={<PhoneIcon/>}
    ref={ref}
    variant="standard"
    {...props}
  />
));

export default IdentificationForm;
