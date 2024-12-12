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
  type Split<S extends string, D extends string> = string extends S
    ? string[]
    : S extends ""
      ? [""]
      : S extends `${infer T}${D}${infer U}`
        ? [T, ...Split<U, D>]
        : [S];

  return value.split(splitter) as Split<Value, Splitter>;
}
