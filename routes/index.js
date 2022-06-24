const express = require("express");
const router = express.Router();

const { user } = require("../controllers");
const { attempt } = require("../middleware");

router.get('/', (request, response, next) => {
  response.render("index", { title: "Surf Shop - Home" });
});

router.post("/sign-up", attempt(user.signup));

router.get("/sign-in", (request, response) => {
  response.send("SIGNING-IN PAGE");
});

router.post("/sign-in", user.signin);

router.post("/sign-out", (request, response) => {
  response.send("SIGN-OUT");
});

router.get("/profile", (request, response) => {
  response.send("PROFILE PAGE");
});

router.put("/profile", (request, response) => {
  response.send("PROFILE UPDATE");
});

router.get("/forget-password", (request, response) => {
  response.send("FORGET PASSWORD PAGE");
});

router.put("/forget-password", (request, response) => {
  response.send("FORGET PASSWORD UPDATE");
});

router.get("/reset-password/:token", (request, response) => {
  response.send("RESET PASSWORD PAGE");
});

router.put("/reset-password/:token", (request, response) => {
  response.send("RESET PASSWORD UPDATE");
});

module.exports = router;
