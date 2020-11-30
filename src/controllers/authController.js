const User = require("../models/User");

const registerController = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = new User({ name, lastName, email, password });
    await newUser.save();
  } catch (err) {}
};

module.exports = { registerController };
