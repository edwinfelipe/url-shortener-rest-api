const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
