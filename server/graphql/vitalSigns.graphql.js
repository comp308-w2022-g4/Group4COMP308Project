const controllers = require("../controllers");

module.exports.resolvers = {
  Mutation: {
    recordVitals: async (_root, _args) =>
      controllers.vitals.recordVitals(_args.vitalsData),
  },

  Query: {
    getVitals: async (_root, _args, context) =>
      controllers.vitals.getVitals(_args.user, context),
  },
};
