import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Blog must have a heading."],
      trim: true,
      minlength: [10, "Title must have more than 10 characters."],
      maxlength: [100, "Title must have less than 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Blog must have a description."],
      trim: true,
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    content: {
      type: String,
      required: [true, "Blog must have content."],
      minlength: [100, "Content must have more than 100 characters."],
      maxlength: [20000, "Content must have less than 20,000 characters."],
    },
    featuredImage: {
      type: String,
      default: "default-blog.jpg",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    usedAI: {
      type: Boolean,
      default: false,
    },
    // tags: {
    //   type: [
    //     {
    //       type: String,
    //       minlength: [2, "Tag is not valid."],
    //       maxlength: [20, "Tag is not valid."],
    //     },
    //   ],
    //   validate: {
    //     validator: function (tags) {
    //       return tags && tags.length > 0;
    //     },
    //     message: "Blog must have at least one tag.",
    //   },
    //   required: true,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("readTime").get(function () {
  const wordsPerMinute = 120;
  const wordCount = this.content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes} min read`;
});

// blogSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "author",
//     select: "name username email verified photo",
//   });
// });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
