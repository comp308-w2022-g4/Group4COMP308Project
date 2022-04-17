const { readFileSync } = require("fs");
const { buildSchema } = require("graphql");
const paths = require("../config").paths;

/**
 * GraphQL schema without any resolvers
 */
const graphQLSchema = buildSchema(readFileSync(paths.schema).toString("utf-8"));

/**
 * @type {import("./resolvers.gen").RootValue}
 */
const rootValue = {
  ...require("./user.resolvers"),
};

module.exports = {
  graphQLSchema,
  rootValue,
};
