const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { getUrl, createUrl } = require("../controllers/urlController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id", getUrl);

router.use(isAuthenticated);

router.post("/url", createUrl);

module.exports = router;
