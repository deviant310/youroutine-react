import React, { forwardRef, useCallback } from 'react';

import { MaskedField } from 'react-fields';

import { KeyIcon } from '../../../concern/ui/icons';

import { Button, Input } from '../../../concern/ui/interactive';

import { Area, Center, Column } from '../../../concern/ui/layout';

import { useLogin } from '../login-context';

const VerificationForm = () => {
  const {
    stageState: [, setStage],
    identificationDataState: [{ phone }],
    verificationDataState: [{ verificationCode }, setVerificationData]
  } = useLogin();

  const onBackButtonClick = useCallback(
    () => {
      setVerificationData({
        sessionId: undefined,
        verificationCode: ''
      });

      setStage('identification');
    },
    [setStage, setVerificationData]
  );

  return (
    <>
      <Center>
        <h2>{phone}</h2>
      </Center>

      <Center>
        Мы отправили вам SMS сообщение с кодом.
      </Center>

      <Area mb={3.5}/>

      <fieldset>
        <MaskedField
          inputComponent={CodeInput}
          label="Код"
          mask="###-###"
          name="verificationCode"
          setValue={setVerificationData}
          setValueFromRecord
          source={String.raw`(\d)`}
          value={verificationCode}
        />
      </fieldset>

      <Area mb={3.5}/>

      <Column>
        <Button
          onClick={onBackButtonClick}
          variant="outlined"
        >
          Назад
        </Button>
      </Column>
    </>
  );
};

const CodeInput: MaskedField.InputComponent = forwardRef((props, ref) => (
  <Input
    adornment={<KeyIcon/>}
    ref={ref}
    variant="standard"
    {...props}
  />
));

export default VerificationForm;
