const Post = require("../models/Post");
const Review = require("../models/Review");

module.exports = {
  review: {
    create: async ({ params, body, user, session }, response, next) => {
      const post = await Post.findById(params.post);
      body.author = user._id;
      const review = await Review.create(body);
      post.reviews.push(review);
      post.save();
      session.success = "Review created successfully!";
      response.redirect(`/posts/${post.id}`);
    },
    update: async (request, response, next) => {
    },
    delete: async (request, response, next) => {
    }
  }
};
