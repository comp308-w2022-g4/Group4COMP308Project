const path = require("path");

const project = path.resolve(__dirname, "..", "..");
const envFile = path.join(project, ".env");
const server = path.join(project, "server");
const client = path.join(project, "client");
const clientBuild = path.join(client, "build");
const indexFile = path.join(clientBuild, "index.html");
const clientBuildStatic = path.join(clientBuild, "static");
const schema = path.join(project, "schema.graphql");

module.exports = {
  project,
  envFile,
  server,
  client,
  clientBuild,
  indexFile,
  clientBuildStatic,
  schema,
};
