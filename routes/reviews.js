const express = require("express");

const router = express.Router({ mergeParams: true });

const { review } = require("../controllers/reviews");
const { attempt, authorize } = require("../middleware");

router.post("/", attempt(review.create));
router.put("/:review", authorize.review.update, attempt(review.update));
router.delete("/:review", attempt(review.delete));

module.exports = router;
