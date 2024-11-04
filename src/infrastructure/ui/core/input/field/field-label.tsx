import { ElementRef } from "react";

import { styled } from "styled-components";

import { getUnitWithMeasure } from "../../../helpers";

export const FieldLabel = styled.label`
  font-size: ${getUnitWithMeasure(1.4)};
  font-weight: 500;
  line-height: ${getUnitWithMeasure(2)};
`;

export type FieldLabelElement = ElementRef<typeof FieldLabel>;
