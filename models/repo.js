import mongoose, { Schema, models } from "mongoose";

const repoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    language: {
      type: String,
    },
    repoStars: {
      type: Number,
      default: 0,
    },
    last_modified: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Repo = models.Repo || mongoose.model("Repo", repoSchema);
export default Repo;
