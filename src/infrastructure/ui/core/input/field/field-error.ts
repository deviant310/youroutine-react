import { styled } from "styled-components";

import { getUnitWithMeasure } from "../../../utils";

export const FieldError = styled.div`
  padding-top: ${getUnitWithMeasure(0.6)};
  color: ${({ theme }) => theme.colors.error[1].filled()};
  font-size: ${getUnitWithMeasure(1.2)};
  line-height: ${getUnitWithMeasure(1.2)};

  &:before {
    content: "\u200b";
  }
`;
