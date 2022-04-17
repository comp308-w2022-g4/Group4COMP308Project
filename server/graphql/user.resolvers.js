const { auth } = require("../controllers");

/**
 * @type {import("./resolvers.gen").RootValue}
 */
const rootValue = {
  whoAmI: (_, request) => request.user,
  signIn: (args) => auth.authenticate(args.email, args.password),
};

module.exports = rootValue;
