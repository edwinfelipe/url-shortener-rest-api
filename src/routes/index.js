const express = require("express");
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const {
  registerController,
  loginController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);

router.use(isAuthenticated);

router.get('/auth', (req,res)=>{
  res.status(200).json('isAuth');
});

module.exports = router;
