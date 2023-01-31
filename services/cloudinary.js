const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  upload: async (files) => {
    return await Promise.all(files.map(async (file) => {
      const { secure_url, public_id } = await cloudinary.v2.uploader.upload(file.path, { folder: "Surf Shop" });
      return { url: secure_url, id: public_id };
    }));
  },
  delete: async (deletions) => {
    for (const deletion of deletions) {
      await cloudinary.v2.uploader.destroy(deletion);
    }
  }
}
