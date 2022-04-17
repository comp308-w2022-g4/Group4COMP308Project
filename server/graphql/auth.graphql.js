const controllers = require("../controllers");

module.exports.schema = /* GraphQL */ `
  type Query {
    """
    Returns the currently logged in user; null if not logged in
    """
    whoAmI: User
  }

  """
  Minimal information needed for registering a new user
  """
  input NewUserInput {
    email: String!
    password: String!
    role: UserRole
  }

  type AuthOutput {
    user: User!
    token: String!
  }

  # Mutation operations regarding user info
  type Mutation {
    """
    Register a new user
    """
    register(accountData: NewUserInput!): AuthOutput

    """
    Request to be authorized and get a jwt
    """
    signIn(email: String!, password: String!): AuthOutput
  }
`;

/**
 * @type {import("./resolvers.gen").Resolvers}
 */
module.exports.resolvers = {
  Query: {
    whoAmI: (_root, _args, context) => context.user,
  },

  Mutation: {
    register: (_root, args) => controllers.auth.register(args.accountData),
    signIn: (_root, args) =>
      controllers.auth.authenticate(args.email, args.password),
  },
};
