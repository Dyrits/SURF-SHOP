import multer from "npm:multer";

import cloudinary from "#/services/cloudinary.js";
import mapbox from "#/services/mapbox.js";

import Post from "#/models/Post.js";

export default {
  posts: {
    render: {
      index: async ({  query  }, response, next) => {
        const posts = await Post.paginate({}, {
          page: query.page || 1,
          limit: 10
        });
        response.render("posts/index", { posts, title: "Surf Shop - Posts" });
      }
    }
  },
  post: {
    render: {
      new: (request, response, next) => {
        response.render("posts/new", { title: "Surf Shop - Create a new post" });
      },
      show: async ({ params }, response, next) => {
        const post = await Post.findById(params.post).populate({
          path: "reviews", options: { sort: { "_id": -1 } }, populate: {
            path: "author",
            model: "User"
          }
        });
        response.render("posts/show", { post });
      },
      edit: async ({ params }, response, next) => {
        const post = await Post.findById(params.post);
        response.render("posts/edit", { post });
      }
    },
    create: async ({ body, files, session }, response, next) => {
      body.images = [];
      body.images = body.images.concat(await cloudinary.upload(files));
      const coordinates = await mapbox.search(body.location);
      body = Object.assign(body, { coordinates });
      const { id } = await Post.create(body);
      session.messages = session.messages || {};
      session.messages.success = "Post created successfully!";
      response.redirect(`/posts/${id}`);
    },
    update: async ({ params, body, files }, response, next) => {
      let post = await Post.findById(params.post);
      const deletions = body["deletions"] || [];
      await cloudinary.delete(deletions);
      post.images = post.images
        .filter(image => !deletions.includes(image.id))
        .concat(await cloudinary.upload(files));
      if (post.location !== body.location) {
        const coordinates = await mapbox.search(body.location);
        body = Object.assign(body, { coordinates });
      }
      post = Object.assign(post, body);
      await post.save();
      response.redirect(`/posts/${params.post}`);
    },
    delete: async ({ params, session }, response, next) => {
      const post = await Post.findByIdAndDelete(params.post);
      await cloudinary.delete(post.images.map(image => image.id));
      session.messages = session.messages || {};
      session.messages.success = "Post deleted successfully!";
      response.redirect("/posts");
    }
  }
};
