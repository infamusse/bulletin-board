const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");

router.get("/posts", PostsController.getAll);
router.get("/post/:id", PostsController.getOne);
router.post("/post", PostsController.post);
router.put("/post/:id", PostsController.put);
router.delete("/post/:id", PostsController.delete);

module.exports = router;
