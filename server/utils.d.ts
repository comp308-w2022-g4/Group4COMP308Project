/**
 * Helper type to remove the first input argument of the given function type
 */
type RemoveFirstArg<F> = F extends (
  first: infer Arg1,
  ...args: infer Args
) => infer R
  ? (...args: Args) => R
  : never;

/**
 * Helper type to transform all value types from resolver types (from
 * `graphql-codegen`) to something that can be used in the `rootValue` passed
 * into `express-graphql`
 *
 * @remarks
 * This is used in the generated resolvers type file.
 * @see {@link ./graphql/resolvers.gen}
 */
declare type ResolverToRootValues<T extends Record<string, any>> = {
  [P in keyof T]: RemoveFirstArg<T[P]>;
};

/**
 * Helper type to drop fields `__typename` and `_id` from GraphQL schema types
 */
declare type WithoutGraphQLId<T> = Omit<T, "__typename" | "_id">;
