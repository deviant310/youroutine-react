export function isDefined<Variable>(
  variable: Variable,
): variable is Defined<Variable> {
  return typeof variable !== "undefined";
}

export type Defined<Variable> = Exclude<Variable, undefined>;
