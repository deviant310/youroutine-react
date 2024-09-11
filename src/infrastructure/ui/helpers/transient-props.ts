export type TransientProps<P> = {
  [K in string & keyof P as `$${K}`]: P[K];
};
