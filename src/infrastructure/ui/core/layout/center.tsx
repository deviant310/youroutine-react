import { HTMLAttributes, NamedExoticComponent, ReactNode, memo } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../helpers";

const StyledCenter = styled.div<TransientProps<CenterForwardedProps>>`
  display: grid;
  justify-content: ${({ $vertical }) => !$vertical && "center"};
  align-items: ${({ $horizontal }) => !$horizontal && "center"};
  height: -webkit-fill-available;
`;

export const Center: CenterComponent = memo<CenterProps>(props => {
  const { horizontal, vertical, ...restProps } = props;

  return (
    <StyledCenter
      $horizontal={horizontal}
      $vertical={vertical}
      {...restProps}
    />
  );
});

Center.displayName = "Center";

export interface CenterComponent extends Omit<NamedExoticComponent, number> {
  (
    props: CenterBaseProps & Pick<CenterForwardedProps, "horizontal">,
  ): ReactNode;
  (props: CenterBaseProps & Pick<CenterForwardedProps, "vertical">): ReactNode;
}

export type CenterBaseProps = HTMLAttributes<HTMLDivElement>;

export type CenterForwardedProps = {
  horizontal?: boolean;
  vertical?: boolean;
};

export type CenterProps = CenterBaseProps & CenterForwardedProps;
