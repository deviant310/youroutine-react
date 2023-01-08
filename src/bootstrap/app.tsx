import UI from '../concern/ui';

import Login from '../modules/login';

import { SharpLinesTheme } from '../styles/themes';

export default function App () {
  return (
    <UI theme={SharpLinesTheme.light}>
      <Login/>
    </UI>
  );
}
