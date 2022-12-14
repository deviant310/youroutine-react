import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)<Icon.Props>`
  // TODO: вынести 1.286 в константу как изначальный размер
  font-size: ${({ size }) => `${1.286 * (size ?? 1)}em`};
  color: ${({ theme }) => theme.colors.icon}
`;

namespace Icon {
  export interface Props {
    size?: number;
  }
}

export default Icon;
