export const measure = "rem";

export function getUnit(size: FixedSize) {
  return {
    0: 0,
    1: 0.25,
    2: 0.5,
    3: 0.75,
    4: 1,
    5: 1.25,
    6: 1.5,
    7: 1.75,
    8: 2,
    9: 2.25,
    10: 2.5,
    11: 2.75,
    12: 3,
  }[size];
}

export function getUnitWithMeasure(value: string | FixedSize | undefined) {
  if (typeof value === "number") return `${getUnit(value)}${measure}`;

  return value;
}

export type FixedSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
