const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItemBody,
  validateItemId,
} = require("../middlewares/validation");
const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD SECTION

// Read (public)
router.get("/", getItems);

router.use(auth);

// CREATE
router.post("/", validateClothingItemBody, createItem);

//  Update
router.put("/:itemId/likes", validateItemId, likeItem);

//  Delete
router.delete("/:itemId", validateItemId, deleteItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
