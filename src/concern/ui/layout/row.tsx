import styled, { css } from 'styled-components';

type RowProps = {
  alignItems?: 'center' | 'top' | 'bottom';
  gap?: number;
  justifyContent?: 'between';
}

export const Row = styled.div<RowProps>`
  display: flex;

  ${({ alignItems }) => {
    switch (alignItems) {
      case 'center':
        return css`
          align-items: center;
        `;
    }
  }}

  ${({ justifyContent }) => {
    switch (justifyContent) {
      case 'between':
        return css`
          justify-content: space-between;
        `;
    }
  }}

  ${({ gap }) => gap && css`
    gap: ${gap}em;
  `}
`;

Row.displayName = 'Row';
