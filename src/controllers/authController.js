const jwt = require("jsonwebtoken");

const HttpException = require("../exceptions/httpException");
const User = require("../models/User");
const handleErrors = require("../utils/handleErrors");
const registerController = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = new User({ name, lastName, email, password });
    const user = await newUser.save();
    console.log(user);
    res.status(201).json(user.toJSON());
  } catch (e) {
    const error = handleErrors(e);
    res.status(error.status).json(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user)
      throw new HttpException({
        message: "The user you are looking for does not exist",
        status: 404,
        fields: ["email"],
      });
    const match = await user.comparePassword(password);
    if (!match)
      throw new HttpException({
        message: "The provided password is not correct",
        status: 400,
        fields: ["password"],
      });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
    const expireDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    res.status(200).json({ token, expireDate });
  } catch (e) {
    const error = handleErrors(e);
    res.status(error.status).json(error);
  }
};

module.exports = { registerController, loginController };
