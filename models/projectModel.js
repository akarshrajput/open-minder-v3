import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    workType: {
      type: String,
      required: [true, "Work must have a type"],
      enum: [
        "Website",
        "Software",
        "Research",
        "Article",
        "Biography",
        "Blog",
        "News",
        "Story",
        "Tutorial",
        "Project",
        "Case Study",
        "Review",
        "Essay",
        "Presentation",
        "Documentation",
        "White Paper",
        "Poetry",
        "Report",
        "Thesis",
        "Portfolio",
      ],
    },
    usedAI: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Work must have a title"],
      minlength: [10, "Heading must have more than 10 characters."],
      maxlength: [100, "Heading must have less than 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Work must have a description"],
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    content: {
      type: String,
      minlength: [100, "Content must have more than 100 characters."],
      maxlength: [20000, "Content must have less than 5,000 characters."],
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
    references: [
      {
        type: String,
        trim: true,
        minlength: [10, "Reference must have more than 10 characters."],
      },
    ],
    source: {
      type: String,
      trim: true,
      minlength: [3, "Source must have more than 3 characters."],
      maxlength: [100, "Source must have less than 100 characters."],
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

workSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email photo verified",
  });
  next();
});

workSchema.pre("save", function (next) {
  const s = this.title.split(" ").join("-").toLowerCase();
  const id = this._id;
  const u = `${s.substring(0, 40)}-${id}`;
  const m = u.replace(/[^a-zA-Z0-9-]/g, "");
  this.slug = m;
  next();
});

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

export default Work;
