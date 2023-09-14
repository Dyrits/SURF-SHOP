const User = require("../models/User");
module.exports = {
  attempt: callback => (request, response, next) => {
    Promise.resolve(callback(request, response, next))
      .catch(error => {
        console.error(error);
        next(error);
      });
  },
  locals: async (request, response, next) => {
    request.user = await User.findOne({ username: "dyrits" });
    request.user = request.user || await User.register(new User({ username: "dyrits" }), "PASSWORD");
    response.locals.user = request.user;
    response.locals.title = "Surf Shop";
    response.locals.messages = { ...request.session.messages };
    delete request.session.messages;
    next();
  }
};