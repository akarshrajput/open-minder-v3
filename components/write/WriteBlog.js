"use client";
import axios from "axios";
import { useState } from "react";
import supabase from "@lib/supabase";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import QuillEditor from "@components/QuillEditor";
import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";

const WriteBlog = ({ supabaseURL, hostname, session }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(""); // This will store the HTML content from QuillEditor
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!featuredImage) {
      toast.error("Please select an image file.");
      return;
    }

    if (featuredImage.type.split("/")[0] !== "image") {
      toast.error("Only image files are allowed");
      return;
    }

    if (!heading || !content || !description || !featuredImage || !tags) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      const imageName = `${Math.random()}-${Date.now()}-${featuredImage?.name}`;
      const imagePath = `${supabaseURL}/storage/v1/object/public/minder-image/${imageName}`;
      const blogData = {
        heading: heading,
        description: description,
        content: content, // HTML content from QuillEditor
        tags: tags,
        author: session.user.userId,
        minderType: "Blog",
        featuredImage: imagePath,
      };

      console.log(blogData);

      const response = await axios.post(
        `${hostname}/api/v1/minders`,
        blogData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const avatarFile = featuredImage;
      await supabase.storage.from("minder-image").upload(imageName, avatarFile);

      const slug = response?.data?.data?.data?.slug;
      toast.success("Blog posted!");
      router.push(`/read/${slug}`);

      setHeading("");
      setDescription("");
      setContent("");
      setFeaturedImage("");
      setTags("");
    } catch (error) {
      toast.error("Error posting blog:", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeadingChange = (e) => {
    if (e.target.value.length <= 100) {
      setHeading(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 300) {
      setDescription(e.target.value);
    }
  };

  const handleContentChange = (value) => {
    if (value.length <= 40000) {
      setContent(value);
    }
  };
  const handleTagsChange = (e) => {
    if (e.target.value.length <= 15) {
      setTags(e.target.value);
    }
  };

  return (
    <div className="font-medium text-stone-600 flex flex-col gap-2">
      <div className="flex gap-2 px-2 items-center text-sm">
        <p className="bg-stone-100 px-3 py-0.5 text-stone-600 border rounded-full">
          Minder Type : Blog
        </p>
        <p className="bg-stone-100 px-3 py-0.5 text-stone-600 text-stone-60 border rounded-full">
          Author : {session?.user?.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-2">
        <QuillEditor value={content} onChange={handleContentChange} />
        <p className="text-sm ml-auto text-emerald-800">
          {content.length}/40,000
        </p>
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Heading</label>
          <textarea
            rows={1}
            className="bg-inherit w-full p-2 outline-none bg-stone-100 border border-stone-300 rounded-sm resize-none"
            value={heading}
            onChange={handleHeadingChange}
            placeholder="Write heading for your Blog"
          ></textarea>
        </div>
        <p className="text-sm ml-auto text-emerald-800">{heading.length}/100</p>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label className="dark:text-stone-200">Choose Photo</label>
            <input
              type="file"
              className="file-input"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <div className="flex items-center gap-1">
              <label className="dark:text-stone-200">Tags</label>
              <textarea
                rows={1}
                value={tags}
                onChange={handleTagsChange}
                className="bg-stone-100 min-w-20 p-2 outline-none border border-stone-300 rounded-sm resize-none"
                placeholder="#tags"
              ></textarea>
            </div>
            {/* <p className="text-red-600 text-sm">*Give space after every tag</p> */}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Description</label>
          <textarea
            rows={2}
            className="bg-stone-100 w-full p-2 outline-none border border-stone-300 rounded-sm resize-none"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write description for your Blog"
          ></textarea>
        </div>
        <p className="text-sm ml-auto text-emerald-800">
          {description.length}/300
        </p>

        <button
          disabled={isLoading}
          className="bg-emerald-600 w-fit text-stone-100 p-2 rounded-md"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <p>Posting</p>
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p>POST</p>

              <PaperPlaneRight weight="bold" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(WriteBlog), { ssr: false });
