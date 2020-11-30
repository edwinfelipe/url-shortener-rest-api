const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z]{2,20}$/.test(value),
      message: "The provided name is not valid",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z]{2,20}$/.test(value),
      message: "The provided lastname is not valid",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[\w\.-]*@\w*\.\w*$/.test(value),
      message: "The provided email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (value) => /^[\W\w]{8,}$/.test(value),
      message: "The password must be at least 8 characters",
    },
  },
  userName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

UserSchema.method("toJSON", function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
