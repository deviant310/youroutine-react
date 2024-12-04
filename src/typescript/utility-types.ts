/* eslint-disable @typescript-eslint/no-explicit-any */
export type KeyPrefix<
  Enumerable,
  Prefix extends string,
  CapitalizeKey extends boolean = false,
> = {
  [Key in keyof Enumerable as Key extends string
    ? `${Prefix}${CapitalizeKey extends true ? Capitalize<Key> : Key}`
    : Key]: Enumerable[Key];
};

export type Readable<A, T = Required<A>> = {
  [K in keyof T]: (<Q>() => Q extends { readonly [X in K]: T[K] }
    ? 0
    : 1) extends <Q>() => Q extends { [X in K]: T[K] } ? 0 : 1
    ? T[K]
    : never;
};

type ReadableKeys<T, R = Readable<T>> = {
  [K in keyof R]: R[K] extends never ? never : K;
}[keyof R];

export type PickReadable<T> = Pick<T, ReadableKeys<T>>;

export type OmitReadable<T> = Omit<T, ReadableKeys<T>>;

export type OmitMethods<T> = Pick<
  T,
  {
    [K in keyof T]: ((...args: Array<any>) => any) extends T[K] ? never : K;
  }[keyof T]
>;

export type PartialMatch<A, B extends A> = {
  [K in keyof A]: Extract<A[K], undefined> extends Extract<B[K], undefined>
    ? B[K]
    : never;
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
