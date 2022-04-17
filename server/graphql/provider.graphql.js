const controllers = require("../controllers");

module.exports.schema = /* GraphQL */ `
  extend type User {
    """
    The designated healthcare provider for the user
    """
    provider: User
  }

  type Query {
    """
    Get a list of patients in charge of the requester

    Returns null if the user is not a nurse
    """
    myPatients: [User!]
  }
`;

/** @type {import("./resolvers.gen").Resolvers} */
module.exports.resolvers = {
  User: {
    // This is necessary because we do not want to return raw `ObjectId`
    provider: async (user, _args, context) =>
      controllers.user.getProvider(user, context),
  },

  Query: {
    myPatients: async (_root, _args, context) =>
      controllers.user.myPatients(context),
  },
};
