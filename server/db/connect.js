import config from "../config.js";
import mongoose from "mongoose";
import { initBuckets } from "../gridfs.js";

const connect = (app) => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");

      // Initialize GridFS buckets
      initBuckets();

      console.log("GridFS buckets initialized");

      app.listen(config.PORT, () => {
        console.log(`Server listening on ${config.PORT}`);
      });
    })
    .catch((err) => {
      console.error("Mongo connection failed:", err);
    });
};

export default connect;