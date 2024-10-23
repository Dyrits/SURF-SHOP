import "jsr:@std/dotenv/load";
import cloudinary from "npm:cloudinary";

cloudinary.config({
  cloud_name: Deno.env.get("CLOUDINARY_CLOUD_NAME"),
  api_key: Deno.env.get('CLOUDINARY_API_KEY'),
  api_secret: Deno.env.get("CLOUDINARY_API_SECRET")
});

export default {
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
