import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    avatar_url: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    proyects: {
      type: Array,
      default: [],
    },
    stars: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
