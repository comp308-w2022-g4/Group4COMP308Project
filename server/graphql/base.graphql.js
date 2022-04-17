const { DateTimeScalar } = require("graphql-date-scalars");

module.exports.schema = /* GraphQL */ `
  """
  Represents a specific date and time

  This is equivalent to \`Date\` in javascript.
  """
  scalar DateTime
`;

/** @type {import("./resolvers.gen").Resolvers} */
module.exports.resolvers = {
  DateTime: DateTimeScalar,
};
