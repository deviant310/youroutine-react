import { forwardRef } from 'react';

import { MaskedField, useForm } from 'react-form';

import { GlobeIcon, PhoneIcon } from '../../../../libs/react-styled-ui/icons';

import { Button, Clickable, Input } from '../../../../libs/react-styled-ui/interactive';

import { Area, Center, Expanded, Row } from '../../../../libs/react-styled-ui/layout';

import { Paper } from '../../../../libs/react-styled-ui/surfaces';

import { Text } from '../../../../libs/react-styled-ui/typography';

import { Logo } from '../../chunks';

import { AutocompleteField } from '../../chunks/fields';

type CountryOption = {
  flag: string;
  id: number;
  phoneCode: string;
  title: string;
};

export default function Login () {
  const [data, setData] = useForm({
    country: countriesOptions.find(({ id }) => id === 2) as CountryOption | null,
    phone: '+79995266422'
  });

  return (
    // TODO: rename fitHeight
    <Center fitHeight={true}>
      <Paper elevation={3}>
        <Area p={3.5} w={32}>
          <Center>
            <Logo/>
          </Center>

          <Area mb={3.5}/>

          <Center>
            <h2>Вход в YouRoutine</h2>
          </Center>

          <Area mb={3.5}/>

          <fieldset>
            <AutocompleteField
              displayValueForOption={displayValueForCountryOption}
              dropdownIsVisibleByDefault={true}
              getOptionKey={getCountryOptionId}
              inputComponent={CountryInput}
              label="Страна"
              name="country"
              onChange={setData}
              optionComponent={CountryOption}
              optionsBuilder={countriesOptionsBuilder}
              selected={data.country}
            />
          </fieldset>

          <Area mb={2}/>

          <fieldset>
            <MaskedField
              inputComponent={PhoneInput}
              label="Номер телефона"
              mask="+7 (###) ###-##-##"
              name="phone"
              onChange={setData}
              source={String.raw`\+7|(\d)`}
              value={data.phone}
            />
          </fieldset>

          <Area mb={3.5}/>

          <Expanded>
            <Button
              className="hello"
              onClick={() => console.log(data)}
            >
              Далее
            </Button>
          </Expanded>
        </Area>
      </Paper>
    </Center>
  );
}

const CountryInput = forwardRef<HTMLInputElement, AutocompleteField.InputProps>((props, ref) => (
  <Input
    adornment={<GlobeIcon/>}
    ref={ref}
    variant="standard"
    {...props}
  />
));

const CountryOption = ({ data, ...props }: AutocompleteField.OptionProps<CountryOption>) => {
  const { flag, phoneCode, title } = data;

  return (
    <Clickable {...props}>
      <Area px={1} py={.6}>
        <Row alignItems="center" justifyContent="between">
          <Row alignItems="center" gap={1}>
            <Text size={1.8}>{flag}</Text>
            {' '}
            <Text>{title}</Text>
          </Row>

          <Text muted>{phoneCode}</Text>
        </Row>
      </Area>
    </Clickable>
  );
};

const countriesOptions: CountryOption[] = [
  { flag: '🇷🇺', id: 1, phoneCode: '+7', title: 'Russia' },
  { flag: '🇬🇪', id: 2, phoneCode: '+995', title: 'Georgia' },
  { flag: '🇺🇸', id: 3, phoneCode: '+1', title: 'USA' },
  { flag: '🇩🇪', id: 4, phoneCode: '+49', title: 'Germany' },
  { flag: '🇬🇧', id: 5, phoneCode: '+44', title: 'United Kingdom' },
  { flag: '🇦🇬', id: 6, phoneCode: '+1268', title: 'Antigua & Barbuda' }
]
  .sort(({ title: nextTitle }, { title: currentTitle }) => (
    nextTitle > currentTitle ? 1 : -1
  ));

const displayValueForCountryOption = ({ title }: CountryOption) => title;
const getCountryOptionId = ({ id }: CountryOption) => id;

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
