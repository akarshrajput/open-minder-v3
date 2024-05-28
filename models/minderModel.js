import mongoose from "mongoose";
import User from "./userModel"; // Adjust the path as necessary

const minderSchema = new mongoose.Schema(
  {
    minderType: {
      type: String,
      required: [
        true,
        "Minder must have a type: ['Blog', 'News', 'Article', 'Research Paper', 'Story', 'Biography']",
      ],
      enum: ["Blog", "News", "Article", "Research Paper", "Story", "Biography"],
    },
    usedAI: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      trim: true,
      required: [true, "Minder must have a heading"],
      minlength: [10, "Heading must have more than 10 characters."],
      maxlength: [100, "Heading must have less than 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Minder must have a description"],
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    content: {
      type: String,
      minlength: [100, "Content must have more than 100 characters."],
      maxlength: [20000, "Content must have less than 20,000 characters."],
    },
    featuredImage: {
      type: String,
      default: "default-minder.jpg",
    },
    collectedImages: {
      type: [
        {
          type: String,
        },
      ],
    },
    tags: {
      type: [
        {
          type: String,
          minlength: [2, "Tag is not valid."],
          maxlength: [60, "Tag must have less than 60 characters."],
        },
      ],
    },
    abstract: {
      type: String,
      trim: true,
      minlength: [50, "Abstract must have more than 50 characters."],
      maxlength: [2000, "Abstract must have less than 2000 characters."],
    },
    journal: {
      type: String,
      trim: true,
      minlength: [3, "Journal name must have more than 3 characters."],
      maxlength: [100, "Journal name must have less than 100 characters."],
    },
    references: [
      {
        type: String,
        trim: true,
        minlength: [10, "Reference must have more than 10 characters."],
      },
    ],
    genre: {
      type: String,
      trim: true,
      minlength: [3, "Genre must have more than 3 characters."],
      maxlength: [50, "Genre must have less than 50 characters."],
    },
    summary: {
      type: String,
      trim: true,
      minlength: [50, "Summary must have more than 50 characters."],
      maxlength: [500, "Summary must have less than 500 characters."],
    },
    source: {
      type: String,
      trim: true,
      minlength: [3, "Source must have more than 3 characters."],
      maxlength: [100, "Source must have less than 100 characters."],
    },
    personalityName: {
      type: String,
      trim: true,
      minlength: [2, "Name must have more than 2 characters."],
      maxlength: [100, "Name must have less than 100 characters."],
    },
    dateOfBirth: {
      type: Date,
    },
    dateOfDeath: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
      minlength: [2, "Nationality must have more than 2 characters."],
      maxlength: [50, "Nationality must have less than 50 characters."],
    },
    achievements: {
      type: [
        {
          title: {
            type: String,
            trim: true,
            minlength: [2, "Title must have more than 2 characters."],
            maxlength: [100, "Title must have less than 100 characters."],
          },
          description: {
            type: String,
            trim: true,
            maxlength: [500, "Description must have less than 500 characters."],
          },
        },
      ],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Minder must have an author"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

minderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email photo verified",
  });
  next();
});

const Minder = mongoose.models.Minder || mongoose.model("Minder", minderSchema);

export default Minder;
