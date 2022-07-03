const express = require('express');
const router = express.Router();

const { $render, post } = require('../controllers/posts');
const { attempt } = require("../middleware");

router.get('/', attempt($render.index));

router.get("/new", $render.new);

router.post("/", attempt(post.create));

router.get("/:id", attempt($render.show));

router.get("/:id/edit", (request, response, next) => {
    response.send("EDIT POST")
});

router.put("/:id", (request, response, next) => {
    response.send("UPDATE POST")
});

router.delete("/:id", (request, response, next) => {
    response.send("DELETE POST")
});

module.exports = router;
