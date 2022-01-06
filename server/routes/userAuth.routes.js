const router = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isEmail = require("validator/lib/isEmail");

router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.statusCode(422).json("email already exist");
  try {
   
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ user: savedUser });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let user = null;
  if (isEmail(req.body.loginInfo)) {
    user = await User.findOne({ email: req.body.loginInfo });
    if (!user) return res.status(400).json("email/password wrong");
  } else {
    user = await User.findOne({ phoneNumber: req.body.loginInfo });
    if (!user) return res.status(400).json("phoneNumber/password wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(404).json("email/password wrong");
  const token = jwt.sign(
    {
      _id: user._id,
      isActive: user.isActive,
      isManager: user.isManager,
      isAdmin: user.idAdmin,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "2 days" }
  );
  return res
    .status(200)
    .header({ access_token: token })
    .json({ token: token, user: user });
});
module.exports = router;
