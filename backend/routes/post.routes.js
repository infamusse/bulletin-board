const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.contreoller");

router.get("/posts", PostsController.getAll);
router.get("/post/:id", PostsController.getOne);
router.post("/post", PostsController.post);

module.exports = router;
