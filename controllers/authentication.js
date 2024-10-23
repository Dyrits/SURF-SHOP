import passport from "npm:passport";

import User from "@/models/User.js";

export default {
  async signup({ body }, response, next) {
    console.info("Signing up user...");
    const { password, ...data } = body;
    const user = await User.register(new User(data), password);
    response.redirect("/");
  },
  signin(request, response, next) {
    console.log("Signing in user...");
    passport.authenticate(
      "local",
      { successRedirect: "/", failureRedirect: "/sign-in" },
      null
    )(request, response, next);
  },
  signout(request, response, next) {
    console.log("Signing out user...");
    request.logout();
    response.redirect("/");
  }
};