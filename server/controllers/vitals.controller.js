const { User, Vitals } = require("../models");

module.exports.recordVitals = async (vitals) => {
  User.findOne(
    { firstName: vitals.firstName, lastName: vitals.lastName },
    (err, user) => {
      if (err) {
        return err;
      }
      if (user.role === "PATIENT") {
        return Vitals.findOneAndUpdate({ _id: user._id }, vitals, {
          upsert: true,
        });
      }
      return null;
    }
  );
};

module.exports.getVitals = async (user, context) => {
  if (context.user) return null;
  if (user.role !== "PATIENT") return null;
  return Vitals.findOne({ patient: user._id });
};
