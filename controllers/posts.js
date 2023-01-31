const multer = require("multer");

const cloudinary = require("../services/cloudinary");

const Post = require("../models/post");

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
        create: async ({ body, files }, response, next) => {
            body.images = [];
            body.images = body.images.concat(await cloudinary.upload(files));
            const { id } = await Post.create(body)
            response.redirect(`/posts/${id}`);
        },
        update: async ({ params, body, files }, response, next) => {
            let post = await Post.findById(params.id);
            const deletions = body["deletions"] || [];
            await cloudinary.delete(deletions);
            post.images = post.images.filter(image => !deletions.includes(image.id)).concat(await cloudinary.upload(files));
            post = Object.assign(post, body);
            await post.save();
            response.redirect(`/posts/${params.id}`);
        },
        delete: async ({ params }, response, next) => {
            await Post.findByIdAndDelete(params.id);
            response.redirect("/posts");
        }
    },
}
