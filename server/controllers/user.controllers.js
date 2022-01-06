const User = require("../models/user.models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedUserData = async (req, res) => {
  const userId = req.verifiedUser._id;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getUserById = async (req, res) => {
  const userId = req.verifiedUser._id;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getUser = async (req, res) => {
  const user = req.user;
  try {
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createUser = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    return res.status(200).json({ savedUser: savedUser });
  } catch (error) {
    return res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  const userId = req.verifiedUser._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.status(200).json({ deletedUser: deletedUser });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateUser = async (req, res) => {
  const userId = req.verifiedUser._id;

  try {
    const data = req.body;
    const { ...dataToUpdate } = data;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      dataToUpdate,
      { new: true }
    );
    return res.status(200).json({ updatedUser: updatedUser });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.createUser = createUser;
module.exports.getOwnedUserById = getOwnedUserData;
module.exports.getUser = getUser;
