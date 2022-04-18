const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', function(req, res, next) {
    res.send('REVIEWS');
});

router.post("/", (req, res) => {
    res.send("CREATE REVIEW");
});

router.get("/:review/edit", (req, res) => {
    res.send("EDIT REVIEW");
});

router.put("/:review", (req, res) => {
    res.send("UPDATE REVIEW");
});

router.delete("/:review", (req, res) => {
    res.send("DELETE REVIEW");
});

module.exports = router;
