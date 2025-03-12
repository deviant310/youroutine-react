import { ComponentProps } from "react";

import { styled } from "styled-components";

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`;

export type FieldsetProps = ComponentProps<typeof Fieldset>;

export type FieldsetElement = HTMLFieldSetElement;
