const { User, DailyINFO } = require("../models");

module.exports.dailyINFOrm = async (dailyINFO) => {
  const user = await User.findOne({
    firstName: dailyINFO.firstName,
    lastName: dailyINFO.lastName,
    role: "PATIENT",
  });
  if (user) {
    return new dailyINFO({
      pulseRate: dailyINFO.pulseRate,
      bloodPressure: dailyINFO.bloodPressure,
      weight: dailyINFO.weight,
      temperature: dailyINFO.temperature,
      patient: user._id,
      respiratoryRate: dailyINFO.respiratoryRate,
    }).save();
  }
  return null;
};

module.exports.getDailyInfo = async (id) => {
  return DailyINFO.findById(id);
};
