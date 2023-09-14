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
      session.messages = session.messages || {};
      session.messages.success = "Review created successfully!";
      response.redirect(`/posts/${post.id}`);
    },
    update: async ({ params, body, session }, response, next) => {
      await Review.findByIdAndUpdate(params.review, { $set: { ...body } });
      session.messages = session.messages || {};
      session.messages.success = "Review updated successfully!";
      response.redirect(`/posts/${params.post}`);
    },
    delete: async (request, response, next) => {
    }
  }
};
