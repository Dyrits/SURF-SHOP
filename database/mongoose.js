import mongoose from "npm:mongoose";

export default {
  schema: "surf-shop",
  host: Deno.env.get("DATABASE_HOST") || "database",
  port: Deno.env.get("DATABASE_PORT") || 27017,
  async connect() {
    await mongoose
      .connect(`mongodb://${this.host}:${this.port}/${this.schema}`)
      .catch(error => {
        console.error("Error connecting to MongoDB: ", error.message);
      });
  },
  database: mongoose.connection
};


