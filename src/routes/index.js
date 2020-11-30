const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { getUrl, getUrls, createUrl } = require("../controllers/urlController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/url/:id", getUrl);

router.use(isAuthenticated);

router.post("/url", createUrl);
router.get("/url", getUrls);

module.exports = router;
