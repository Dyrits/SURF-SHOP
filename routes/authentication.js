import express from "npm:express";
import controller from "#/controllers/authentication.js"
import middlewares from "#/middlewares/index.js";

const { signin, signup, signout } = controller
const { attempt } = middlewares;

const router = express.Router();

router.get('/', (request, response, next) => {
  response.render("index", { title: "Surf Shop - Home" });
});

router.post("/sign-up", attempt(signup));

router.get("/sign-in", (request, response) => {
  response.send("SIGNING-IN PAGE");
});

router.post("/sign-in", signin);
router.get("/sign-out", signout);

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

export default router;
