// TODO переименовать, подумать насчет найминга getSpacing(unit: SpacingUnit)
export function getUnitWithMeasure(
  value: UnitIndex | string | number | undefined,
) {
  if (typeof value === "number") return `${value}rem`;

  return value;
}

export type UnitIndex =
  | 0
  | 0.2
  | 0.4
  | 0.6
  | 0.8
  | 1
  | 1.2
  | 1.4
  | 1.6
  | 1.8
  | 2
  | 2.2
  | 2.4
  | 2.6
  | 2.8
  | 3
  | 3.2
  | 3.4
  | 3.6
  | 3.8
  | 4
  | 4.2
  | 4.4
  | 4.6
  | 4.8;
