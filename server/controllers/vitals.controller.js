const { User, Vitals } = require("../models");

module.exports.recordVitals = async (vitals) => {
  const user = await User.findOne({
    firstName: vitals.firstName,
    lastName: vitals.lastName,
    role: "PATIENT",
  });
  if (user) {
    const oldVitals = await Vitals.findOne({ patient: user._id });
    if (oldVitals) {
      return Vitals.findOneAndUpdate(
        { patient: user._id },
        {
          bodyTemperature: vitals.bodyTemperature,
          heartRate: vitals.heartRate,
          bloodPressure: vitals.bloodPressure,
          respiratoryRate: vitals.respiratoryRate,
          patient: user._id,
          nurse: vitals.nurse,
          recorded: Date.now(),
        }
      );
    }
    return new Vitals({
      bodyTemperature: vitals.bodyTemperature,
      heartRate: vitals.heartRate,
      bloodPressure: vitals.bloodPressure,
      respiratoryRate: vitals.respiratoryRate,
      patient: user._id,
      nurse: vitals.nurse,
    }).save();
  }
  return null;
};

module.exports.getVitals = async (user) => {
  if (user.role !== "PATIENT") return null;
  return Vitals.findOne({ patient: user._id });
};
