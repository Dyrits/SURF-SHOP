const express = require('express');
const router = express.Router();

const { $render, post } = require('../controllers/posts');
const { attempt } = require("../middleware");

router.get('/', attempt($render.posts));

router.get("/new", $render.new);

router.post("/", attempt(post.create));

router.get("/:post", (request, response, next) => {
    response.send("POST")
});

router.get("/:post/edit", (request, response, next) => {
    response.send("EDIT POST")
});

router.put("/:post", (request, response, next) => {
    response.send("UPDATE POST")
});

router.delete("/:post", (request, response, next) => {
    response.send("DELETE POST")
});

module.exports = router;
