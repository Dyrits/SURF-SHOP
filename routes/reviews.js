import express from "npm:express";
import controller from "#/controllers/reviews.js";
import middlewares from "#/middlewares/index.js";

const { review } = controller;
const { attempt, authorize } = middlewares;

const router = express.Router({ mergeParams: true });

router.post("/", attempt(review.create));
router.put("/:review", authorize.review.update, attempt(review.update));
router.delete("/:review", attempt(review.delete));

export default router;
