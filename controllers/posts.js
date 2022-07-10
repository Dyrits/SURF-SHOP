const Post = require('../models/post');

module.exports = {
    posts: {
        render: {
            "index": async (request, response, next) => {
                const posts = await Post.find({});
                response.render("posts/index", {posts});
            }
        }
    },
    post: {
        render: {
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
        create: async ({ body }, response, next) => {
            const { id } = await Post.create(body)
            response.redirect(`/posts/${id}`);
        },
        update: async ({ params, body }, response, next) => {
            await Post.findByIdAndUpdate(params.id, body);
            response.redirect(`/posts/${params.id}`);
        },
        delete: async ({ params }, response, next) => {
            await Post.findByIdAndDelete(params.id);
            response.redirect("/posts");
        }
    }
}