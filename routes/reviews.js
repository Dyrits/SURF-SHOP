const express = require("express");

const router = express.Router({ mergeParams: true });

const { review } = require("../controllers/reviews");
const { attempt } = require("../middleware");

router.post("/", attempt(review.create));
router.put("/:review", attempt(review.update));
router.delete("/:review", attempt(review.delete));

module.exports = router;
