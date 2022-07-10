const express = require('express');
const router = express.Router();

const { posts, post } = require('../controllers/posts');
const { attempt } = require("../middleware");

router.get('/', attempt(posts.render.index));
router.get("/new", post.render.new);
router.post("/", attempt(post.create));
router.get("/:id", attempt(post.render.show));
router.get("/:id/edit", attempt(post.render.edit));
router.put("/:id", attempt(post.update));
router.delete("/:id", attempt(post.delete));

module.exports = router;
