const User = require('../models/user');

module.exports = {
    user: {
        async signup({body}, response, next) {
            const { password, ...data } = body;
            const user = await User.register(new User(data), password);
            response.redirect("/");
        }
    }
};