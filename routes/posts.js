import express from "npm:express";
import multer from "npm:multer";

import controller from "@/controllers/posts.js";
import middlewares from "@/middlewares/index.js";

const { posts, post } = controller;
const { attempt } = middlewares;

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", attempt(posts.render.index));
router.get("/new", post.render.new);
router.post("/", upload.array("images", 4), attempt(post.create));
router.get("/:post", attempt(post.render.show));
router.get("/:post/edit", attempt(post.render.edit));
router.put("/:post", upload.array("images", 4), attempt(post.update));
router.delete("/:post", attempt(post.delete));

export default router;
