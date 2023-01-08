import styled, { css } from 'styled-components';

export const Area = styled.div<Area.Props>`
  ${({ width }) => width && css`
    width: ${width}em;
  `}
  ${({ height }) => height !== undefined && css`
    height: ${{
    number: `${height}em`,
    string: height
  }[(typeof height).toString()]};
  `}
  ${({ fillAvailableWidth }) => fillAvailableWidth && css`
    width: fill-available;
  `};
  ${({ fillAvailableHeight }) => fillAvailableHeight && css`
    height: fill-available;
  `};
  ${({ p, pt, py }) => (p ?? pt ?? py) && css`
    padding-top: ${pt ?? py ?? p}em;
  `}
  ${({ p, pb, py }) => (p ?? pb ?? py) && css`
    padding-bottom: ${pb ?? py ?? p}em;
  `}
  ${({ p, pl, px }) => (p ?? pl ?? px) && css`
    padding-left: ${pl ?? px ?? p}em;
  `}
  ${({ p, pr, px }) => (p ?? pr ?? px) && css`
    padding-right: ${pr ?? px ?? p}em;
  `}
  ${({ m, mt, my }) => (m ?? mt ?? my) && css`
    margin-top: ${mt ?? my ?? m}em;
  `}
  ${({ m, mb, my }) => (m ?? mb ?? my) && css`
    margin-bottom: ${mb ?? my ?? m}em;
  `}
  ${({ m, ml, mx }) => (m ?? ml ?? mx) && css`
    margin-left: ${ml ?? mx ?? m}em;
  `}
  ${({ m, mr, mx }) => (m ?? mr ?? mx) && css`
    margin-right: ${mr ?? mx ?? m}em;
  `}
`;

Area.displayName = 'Area';

namespace Area {
  export interface PropsWithIndents {
    m?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    mt?: number;
    mx?: number;
    my?: number;
    p?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    pt?: number;
    px?: number;
    py?: number;
  }

  interface PropsWithConcreteSizes {
    fillAvailableHeight?: never;
    fillAvailableWidth?: never;
    height?: string | number;
    width?: number;
  }

  interface PropsWithAutoSizes {
    fillAvailableHeight?: boolean;
    fillAvailableWidth?: boolean;
    height?: never;
    width?: never;
  }

  export type Props =
    | PropsWithIndents & PropsWithConcreteSizes
    | PropsWithIndents & PropsWithAutoSizes
}
