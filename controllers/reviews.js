import Post from "@/models/Post.js";
import Review from "@/models/Review.js";

export default {
  review: {
    create: async ({ params, body, user, session }, response, next) => {
      const post = await Post.findById(params.post).populate("reviews").exec();
      session.messages = session.messages || {};
      if (post.reviews.some(review => review.author.equals(user._id))) {
        session.messages.error = "You can only create one review per post.";
        return response.redirect(`/posts/${post.id}`);
      }
      body.author = user._id;
      const review = await Review.create(body);
      post.reviews.push(review);
      post.save();
      session.messages.success = "Review created successfully!";
      response.redirect(`/posts/${post.id}`);
    },
    update: async ({ params, body, session }, response, next) => {
      await Review.findByIdAndUpdate(params.review, { $set: { ...body } });
      session.messages = session.messages || {};
      session.messages.success = "Review updated successfully!";
      response.redirect(`/posts/${params.post}`);
    },
    delete: async ({ params, session }, response, next) => {
      const { review, post } = params;
      await Post.findByIdAndUpdate(post, { $pull: { reviews: review } });
      await Review.findByIdAndDelete(review);
      session.messages = session.messages || {};
      session.messages.success = "Review deleted successfully!";
      response.redirect(`/posts/${post}`);
    }
  }
};
