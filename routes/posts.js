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

router.get("/:id", (request, response, next) => {
    response.send("POST")
});

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
