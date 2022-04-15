export type RemoveFirstArg<F> = F extends (
  first: infer Arg1,
  ...args: infer Args
) => infer R
  ? (...args: Args) => R
  : never;

export type ResolverToRootValues<T> = {
  [P in keyof T]: RemoveFirstArg<T[P]>;
};
