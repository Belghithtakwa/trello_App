const router = require("express").Router();
const userControllers = require("../controllers/user.controllers");
const User = require("../models/user.models");

router.param("user", async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json("user not found");
    req.user = user;
    return next();
  } catch (err) {
    res.status(500).json(err);
  }
});
//route admin
router.get("/admin", userControllers.getUsers);
router.get("/admin/:user", userControllers.getUser);
router.put(
  "/admin/:user",
  verifyToken,
  isActive,
  isAdmin,
  userControllers.updateUser
);
router.delete(
  "/admin/:user",
  verifyToken,
  isActive,
  isAdmin,
  userControllers.deleteUser
);

router.get("/me", verifyToken, isActive, userControllers.getOwnedUserById);
router.put("/me", verifyToken, isActive, userControllers.updateUser);
router.delete("/me", verifyToken, isActive, userControllers.deleteUser);

module.exports = router;
