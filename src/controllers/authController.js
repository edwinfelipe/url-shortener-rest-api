const User = require("../models/User");
const handleErrors = require("../utils/handleErrors");
const registerController = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = new User({ name, lastName, email, password });
    const user = await newUser.save();
    res.status(201).json(user.toJSON());
  } catch (e) {
    const error = handleErrors(e);
    res.status(error.status).json(error);
  }
};

module.exports = { registerController };
