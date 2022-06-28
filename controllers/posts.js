const Post = require('../models/post');

module.exports = {
    $render: {
        "posts": async (request, response, next) => {
            const posts = await Post.find({});
            response.render("posts/index", { posts });
        },
        "new": (request, response, next) => { response.render("posts/new"); }
    },
    post: {
        create: async ({body}, response, next) => {
            const { id } = await Post.create(body)
            response.redirect(`/posts/${id}`);
        }
    }
}