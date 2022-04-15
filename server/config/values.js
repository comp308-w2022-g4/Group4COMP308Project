const dotenv = require("dotenv").config;
const paths = require("./paths");

dotenv({ path: paths.envFile });

const port = process.env.PORT || 3001;

const db = process.env.DB || "mongodb://localhost/group4-comp308-project";

module.exports = { port, db };
