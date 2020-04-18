const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");

router.get("/posts", PostsController.getAll);
router.get("/post/:id", PostsController.getOne);
router.get("/post/user/:user", PostsController.getUserPosts);

// router.use((req, res, next) => {
//   console.log("middleware", req.user);
//   if (req.user) {
//     console.log("next", req.user);
//     next();
//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

router.post("/post", PostsController.post);
router.put("/post/:id", PostsController.put);
router.delete("/post/:id", PostsController.delete);

module.exports = router;
