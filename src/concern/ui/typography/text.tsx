import styled, { css } from 'styled-components';

type TextProps = {
  muted?: boolean;
  size?: number;
}

export const Text = styled.span<TextProps>`
  font-size: ${({ size }) => `${size ?? 1}em`};

  ${({ muted, theme }) => muted && css`
    color: ${theme.colors.neutral.alpha(.3).hexa()};
  `}
`;

Text.displayName = 'Text';
