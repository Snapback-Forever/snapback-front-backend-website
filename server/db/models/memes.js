import mongoose from "mongoose";

const memeSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
      },

      profilePicFileId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        default: null,
      },

      profilePicBucketName:
        {
          type: String,
          default: null,
        },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Meme",
  memeSchema
);