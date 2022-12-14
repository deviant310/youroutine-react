import React from 'react';

import Login from './components/views/login/login';

import { SharpLinesTheme } from './styles/themes';

import UI from '../libs/react-styled-ui';

export default function App () {
  return (
    <UI theme={SharpLinesTheme.light}>
      <Login/>
    </UI>
  );
}
