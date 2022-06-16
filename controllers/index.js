const User = require('../models/user');

module.exports = {
    user: {
        signup ({ body }, response, next) {
            console.info("Signing up user...");
            User.register(new User({ username: body.username }), body.password, (error, user) => {
                if (error) {
                    console.error(error);
                    next(error);
                } else {
                    console.info("User signed up successfully.");
                    response.redirect('/');
                }
            });
        },
        signin (request, response) {}
    }
};