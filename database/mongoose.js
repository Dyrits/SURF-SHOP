import mongoose from "npm:mongoose";

export default {
  schema: "surf-shop",
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 27017,
  async connect() {
    await mongoose
      .connect(`mongodb://${this.host}:${this.port}/${this.schema}`)
      .catch(error => {
        console.error("Error connecting to MongoDB: ", error.message);
      });
  },
  database: mongoose.connection
};


