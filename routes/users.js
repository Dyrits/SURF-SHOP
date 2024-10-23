import express from "npm:express";

const router = express.Router();

router.get("/", (request, response, next) => {
  response.send("USERS");
});

export default router;