module.exports.schema = /* GraphQL */ `
  """
  Possible values for the role of a registered user
  """
  enum UserRole {
    NURSE
    PATIENT
  }

  """
  A registered user
  """
  type User {
    id: ID!
    email: String!
    role: UserRole!
  }
`;

/** @type {import("./resolvers.gen").Resolvers} */
module.exports.resolvers = {};
