import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useState
} from 'react';

import { Some } from '../../utility-types';

export type Country = {
  code: number;
  flag: string;
  id: number;
  phoneMask: string;
  title: string;
};

const LoginContext = createContext<LoginContext.StateMap>({} as LoginContext.StateMap);

const identificationDataInitial: LoginContext.IdentificationData = {
  country: null,
  phone: ''
};

const verificationDataInitial = {
  verificationCode: ''
};

export const LoginProvider: LoginContext.ProviderComponent = props => {
  const { children } = props;

  const stateMap = {
    identificationDataState: useReducer(
      dataReducer as typeof dataReducer<LoginContext.IdentificationData>,
      identificationDataInitial
    ),
    stageState: useState<LoginContext.Stage>('identification'),
    verificationDataState: useReducer(
      dataReducer as typeof dataReducer<LoginContext.VerificationData>,
      verificationDataInitial
    ),
  };

  return (
    <LoginContext.Provider value={stateMap}>
      {children}
    </LoginContext.Provider>
  );
};

export const LoginConsumer = LoginContext.Consumer;

export const useLogin = () => useContext(LoginContext);

function dataReducer<Data extends object> (state: Data, payload: Some<Data>) {
  const payloadHasNewData = Object
    .entries(payload)
    .some(([key, value]) => state[key as keyof typeof state] !== value);

  return payloadHasNewData
    ? { ...state, ...payload }
    : state;
}

export namespace LoginContext {
  export interface ProviderComponent {
    (props: ProviderProps): JSX.Element;
  }

  export type ProviderProps = PropsWithChildren;

  export interface IdentificationData {
    country: Country | null;
    phone: string;
  }

  export interface VerificationData {
    sessionId?: string;
    verificationCode: string;
  }

  export type Stage =
    | 'identification'
    | 'verification';

  export interface StateMap {
    identificationDataState: [IdentificationData, Dispatch<Some<IdentificationData>>];
    stageState: [Stage, Dispatch<Stage>];
    verificationDataState: [VerificationData, Dispatch<Some<VerificationData>>];
  }
}
