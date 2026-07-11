const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// Return current user
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
