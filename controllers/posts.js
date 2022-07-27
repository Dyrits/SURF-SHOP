const cloudinary = require("cloudinary");

const Post = require("../models/post");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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
            for (const file of files) {
                const { secure_url, public_id } = await cloudinary.v2.uploader.upload(file.path);
                body.images.push({ url: secure_url, id: public_id });
            }
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