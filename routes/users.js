const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateCurrentUser,
  login,
} = require("../controllers/users");

// Public auth route
router.post("/login", login);

// Return current user
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
