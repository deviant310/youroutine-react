export function capitalize<Value extends string>(value: Value) {
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  return <Capitalize<Value>>capitalizedValue;
}

export function camelize<Value extends string>(value: Value) {
  const capitalizedValue = value.charAt(0).toLowerCase() + value.slice(1);

  return <Uncapitalize<Value>>capitalizedValue;
}

export function split<Value extends string, Splitter extends string>(
  value: Value,
  splitter: Splitter,
) {
  return value.split(splitter) as Split<Value, Splitter>;
}

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? [""]
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

export function join<Values extends string[], Separator extends string>(
  values: Values,
  separator: Separator,
) {
  return values.join(separator) as Join<Values, Separator>;
}

export type Join<T extends string[], S extends string> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? Rest extends []
    ? First
    : `${First}${S}${Join<Rest, S>}`
  : "";
