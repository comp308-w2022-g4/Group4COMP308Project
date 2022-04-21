/**
 * Temporary mock resolvers for mock schema
 * @type {import("./resolvers.gen").Resolvers}
 */
module.exports.resolvers = {
  Mutation: {
    dailyINFOrm: (_root, args) => ({ token: args.temperature }),
  },
};
