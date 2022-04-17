const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const { paths, isProduction } = require("../config");

/** @typedef {{schema?: string, resolvers?: import("./resolvers.gen").Resolvers}} ExtractedFile */

/**
 * Array of all files that contain the GraphQL schema and resolvers
 * @type {ExtractedFile[]}
 */
const files = loadFilesSync(path.join(paths.serverGraphQL, "*.graphql.js"), {
  exportNames: [],
  extractExports,
});

// Merge the schema definitions
const typeDefs = mergeTypeDefs(
  files.map((file) => file.schema ?? "").filter(Boolean)
);

// Merge the resolvers
const resolvers = mergeResolvers(files.map((file) => file.resolvers));

// Create a schema with execution information
const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * Express middleware for handling a GraphQL request
 */
const graphQLServer = graphqlHTTP((request, response, graphQLParams) => ({
  schema,
  context: request,
  graphiql: !isProduction,
}));

module.exports = {
  typeDefs,
  resolvers,
  schema,
  graphQLServer,
};

/**
 * @param {any} fileExport
 * @returns {ExtractedFile}
 */
function extractExports(fileExport) {
  let schema = undefined;
  let resolvers = undefined;

  if (!fileExport) return {};

  if (typeof fileExport === "string") {
    schema = fileExport;
  } else if (typeof fileExport.schema === "string") {
    schema = fileExport.schema;
  }

  if (typeof fileExport.resolvers === "object") {
    resolvers = fileExport.resolvers;
  } else if (typeof fileExport.resolver === "object") {
    resolvers = fileExport.resolver;
  }

  if (!schema && !resolvers && typeof fileExport === "object") {
    resolvers = fileExport;
  }

  return { schema, resolvers };
}
