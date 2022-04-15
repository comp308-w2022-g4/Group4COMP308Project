const mongoose = require("mongoose");

/**
 * @typedef {import("../graphql/resolvers.gen").UserRole} UserRole
 */

/**
 * Structure of the data of a registered user
 * @typedef {object} UserData
 * @property {string} email
 * @property {string} password
 * @property {UserRole} role
 */

/**
 * Mongoose document of a registered user
 * @typedef {mongoose.HydratedDocument.<UserData>} UserDoc
 */

/**
 * Mongoose schema of a registered user
 * @type {mongoose.Schema.<UserData>}
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    transform: () => "********",
  },
  role: {
    type: String,
    enum: ["NURSE", "PATIENT"],
    default: "PATIENT",
  },
});

/**
 * Mongoose model of a registered user
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
