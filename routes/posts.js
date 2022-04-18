const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.send("POSTS")
});

router.get("/new", (request, response, next) => {
    response.send("NEW POST")
});

router.post("/", (request, response, next) => {
    response.send("CREATE POST")
});

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
