const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const { posts, post } = require("../controllers/posts");
const { attempt } = require("../middleware");

router.get("/", attempt(posts.render.index));
router.get("/new", post.render.new);
router.post("/", upload.array("images", 4), attempt(post.create));
router.get("/:id", attempt(post.render.show));
router.get("/:id/edit", attempt(post.render.edit));
router.put("/:id", upload.array("images", 4), attempt(post.update));
router.delete("/:id", attempt(post.delete));

module.exports = router;
