import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    // Add other fields as necessary
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
