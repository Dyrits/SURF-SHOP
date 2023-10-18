const User = require("../models/User");
const Review = require("../models/Review");

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
  },
  authorize: {
    review: {
      update: async (request, response, next) => {
        let review = await Review.findById(request.params.review);
        if (review.author.equals(request.user._id)) {
          return next();
        }
        request.session.messages = { error: "You don't have permission to edit a review of someone else." };
        return response.redirect(`/posts/${request.params.post}`);
      }
    }
  }
};