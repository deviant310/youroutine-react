import {
  MutableRefObject,
  ReactNode,
  forwardRef,
  useCallback
} from 'react';

import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  padding: 0;
  outline: none;
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.alpha(.3).hexa()};
  }
`;

const AdornmentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  height: 100%;
`;

const StandardWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 0;
  gap: 15px;
  cursor: text;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.accent.lighten(1.05).hex()};
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    transition: transform 200ms;
    background-color: ${({ theme }) => theme.colors.accent.hex()};
  }

  &:focus-within:after {
    transform: scaleX(1);
  }
`;

const FilledWrapper = styled(StandardWrapper)`
  background-color: ${({ theme }) => theme.colors.primary.darken(.02).hex()};
  border-radius: 6px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 0 0 0 1px inset ${({ theme }) => theme.colors.primary.darken(.03).hex()};

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.primary.darken(.02).hex()};
    box-shadow: 0 0 0 2px inset ${({ theme }) => theme.colors.accent.hex()};
  }

  &:before, &:after {
    display: none;
  }
`;

const getWrapperComponent = (variant?: Input.Variant) => {
  switch (variant) {
    case 'standard':
    default:
      return StandardWrapper;

    case 'filled':
      return FilledWrapper;
  }
};

export const Input: Input.ExoticComponent = forwardRef((props, ref) => {
  const { adornment, variant, ...rest } = props;
  const StyledWrapper = getWrapperComponent(variant);

  const focusInput = useCallback(
    () => (ref as MutableRefObject<HTMLInputElement>).current.focus(),
    [ref]
  );

  return (
    <StyledWrapper onClick={focusInput}>
      {adornment && (
        <AdornmentWrapper>
          {adornment}
        </AdornmentWrapper>
      )}

      <StyledInput {...rest} ref={ref}/>
    </StyledWrapper>
  );
});

Input.displayName = 'Input';

export namespace Input {
  export type ExoticComponent = ReturnType<typeof forwardRef<HTMLInputElement, Props>>;

  export type Variant =
    | 'standard'
    | 'filled';

  export interface Props {
    adornment?: ReactNode;
    variant?: Variant;
  }
}
