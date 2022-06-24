const User = require('../models/user');

module.exports = {
    user: {
        async signup({body}, response, next) {
            console.info("Signing up user...");
            const { password, ...data } = body;
            const user = await User.register(new User(data), password);
            console.info("User signed up successfully!");
            console.info("User:", user);
            response.redirect("/");
        },
        signin (request, response) {
            console.info("Signing in user...");
            response.redirect("/");
        }
    }
};