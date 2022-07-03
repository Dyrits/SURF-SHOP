const Post = require('../models/post');

module.exports = {
    $render: {
        "index": async (request, response, next) => {
            const posts = await Post.find({});
            response.render("posts/index", { posts });
        },
        "new": (request, response, next) => { response.render("posts/new"); },
        "show": async ({ params }, response, next) => {
            const post = await Post.findById(params.id);
            response.render("posts/show", { post });
        },
        "edit": async ({ params }, response, next) => {
            const post = await Post.findById(params.id);
            response.render("posts/edit", { post });
        }
    },
    post: {
        create: async ({ body }, response, next) => {
            const { id } = await Post.create(body)
            response.redirect(`/posts/${id}`);
        }
    }
}