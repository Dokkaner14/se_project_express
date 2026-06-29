const router = require("express").Router();
const { createItem, getItems, likeItem, dislikeItem, deleteItem } =
  require("../controllers/clothingItems").default;

// CRUD SECTION //

// CREATE
router.post("/", createItem);

//  Read

router.get("/", getItems);

//  Update

router.put("/:itemId/likes", likeItem);

//  Delete

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
