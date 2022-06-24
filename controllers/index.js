const passport = require("passport");

const User = require('../models/user');

module.exports = {
    user: {
        async signup({body}, response, next) {
            console.info("Signing up user...");
            const { password, ...data } = body;
            const user = await User.register(new User(data), password);
            response.redirect("/");
        },
        signin(...arguments) {
            console.log("Signing in user...");
            passport.authenticate(
                "local",
                { successRedirect: "/",  failureRedirect: "/sign-in" },
                null
            )(...arguments);
        },
        signout(request, response, next) {
            console.log("Signing out user...");
            request.logout();
            response.redirect("/");
        }
    }
};