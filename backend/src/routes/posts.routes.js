const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const postsController = require("../controllers/posts.controller");


router.get("/", authMiddleware.verifyToken, postsController.fetchAllPosts);

router.post("/", authMiddleware.verifyToken, postsController.newPost);

router.delete("/:id", authMiddleware.verifyToken, postsController.deletePost);

module.exports = router;