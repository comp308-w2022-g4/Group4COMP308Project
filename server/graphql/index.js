const { readFileSync } = require("fs");
const { buildSchema } = require("graphql");
const paths = require("../config").paths;

const graphQLSchema = buildSchema(readFileSync(paths.schema).toString("utf-8"));

/**
 * @type {import("./resolvers.gen").RootValue}
 */
const rootValue = {
  whoAmI: (_, req) => ({
    _id: "1234",
    email: "user@example.com",
    role: "PATIENT",
  }),
  signIn: (args, req) => `Your email was ${args.email}`,
};

module.exports = {
  graphQLSchema,
  rootValue,
};
