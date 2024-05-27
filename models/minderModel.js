import mongoose from "mongoose";

const minderSchema = new mongoose.Schema(
  {
    minderType: {
      // For all compulsary
      type: String,
      required: [
        true,
        "Minder must have a type: ['Blog', 'News', 'Article', 'Research Paper', 'Story', 'Biography']",
      ],
      enum: ["Blog", "News", "Article", "Research Paper", "Story", "Biography"],
    },
    usedAI: {
      // For all
      type: Boolean,
      default: false,
    },
    heading: {
      // For all
      type: String,
      trim: true,
      required: true,
      minlength: [10, "Heading must have more than 10 characters."],
      maxlength: [100, "Heading must have less than 100 characters."],
    },
    description: {
      // For all
      type: String,
      trim: true,
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    content: {
      // For all
      type: String,
      minlength: [100, "Content must have more than 100 characters."],
      maxlength: [20000, "Content must have less than 20,000 characters."],
    },
    featuredImage: {
      // For all
      type: String,
      default: "default-minder.jpg",
    },
    collectedImages: {
      // For Blog, Article, News, Story
      type: [
        {
          type: String,
        },
      ],
    },
    tags: {
      // For all
      type: [
        {
          type: String,
          minlength: [2, "Tag is not valid."],
          maxlength: [60, "Tag must have less than 40 characters."],
        },
      ],
    },
    abstract: {
      // For Research Paper
      type: String,
      trim: true,
      minlength: [50, "Abstract must have more than 50 characters."],
      maxlength: [2000, "Abstract must have less than 2000 characters."],
    },
    journal: {
      // For Research Paper
      type: String,
      trim: true,
      minlength: [3, "Journal name must have more than 3 characters."],
      maxlength: [100, "Journal name must have less than 100 characters."],
    },
    references: [
      // For Research Paper
      {
        type: String,
        trim: true,
        minlength: [10, "Reference must have more than 10 characters."],
      },
    ],
    genre: {
      // For Story
      type: String,
      trim: true,
      minlength: [3, "Genre must have more than 3 characters."],
      maxlength: [50, "Genre must have less than 50 characters."],
    },
    summary: {
      // For Articles, Story, News, Blog
      type: String,
      trim: true,
      minlength: [50, "Summary must have more than 50 characters."],
      maxlength: [500, "Summary must have less than 500 characters."],
    },
    source: {
      // For News
      type: String,
      trim: true,
      minlength: [3, "Source must have more than 3 characters."],
      maxlength: [100, "Source must have less than 100 characters."],
    },
    personalityName: {
      // For Biography
      type: String,
      trim: true,
      minlength: [2, "Name must have more than 2 characters."],
      maxlength: [100, "Name must have less than 100 characters."],
    },
    dateOfBirth: {
      // For Biography
      type: Date,
    },
    dateOfDeath: {
      // For Biography
      type: Date,
    },
    nationality: {
      // For Biography
      type: String,
      trim: true,
      minlength: [2, "Nationality must have more than 2 characters."],
      maxlength: [50, "Nationality must have less than 50 characters."],
    },
    achievements: {
      // For Biography
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
    // author: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// blogSchema.virtual("readTime").get(function () {
//   const wordsPerMinute = 120;
//   const wordCount = this.content.split(/\s+/).length;
//   const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
//   return `${readTimeMinutes} min read`;
// });

// blogSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "author",
//     select: "name username email verified photo",
//   });
// });

const Minder = mongoose.models.Minder || mongoose.model("Minder", minderSchema);

export default Minder;
