export type TransientProps<P> = {
  [K in keyof P as K extends string ? `$${K}` : K]: P[K];
};
