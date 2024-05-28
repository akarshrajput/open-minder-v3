"use client";
import hostname from "@lib/hostname";
import axios from "axios";
import { useState } from "react";
import supabase from "@lib/supabase";
import supabaseURL from "@lib/supabaseurl";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const WriteStory = ({ session }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState({});
  const [genre, setGenre] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !heading ||
      !description ||
      !content ||
      !featuredImage ||
      !tags ||
      !genre ||
      !summary
    )
      return;
    try {
      setIsLoading(true);
      const imageName = `${Math.random()}-${Date.now()}-${featuredImage?.name}`;
      const imagePath = `${supabaseURL}/storage/v1/object/public/blog-photo/${imageName}`;
      const storyData = {
        heading: heading,
        description: description,
        content: content,
        tags: tags,
        author: session.user.userId,
        minderType: "Story",
        genre: genre,
        summary: summary,
        featuredImage: imagePath,
      };

      // console.log(blogData);

      const response = await axios.post(
        `${hostname}/api/v1/minders`,
        storyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const avatarFile = featuredImage;
      await supabase.storage.from("blog-photo").upload(imageName, avatarFile);

      //   console.log("Blog posted successfully:", response.data);
      toast.success("Blog posted!");
      router.push("/");

      setHeading("");
      setDescription("");
      setContent("");
      setFeaturedImage({});
      setTags([]);
    } catch (error) {
      toast.error("Error posting blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = (e) => {
    const inputTags = e.target.value.split(" ").filter((tag) => tag);
    setTags(inputTags);
  };

  return (
    <div className="font-medium flex flex-col gap-2">
      <div className="flex gap-2 items-center text-sm">
        <p className="bg-gray-200 px-2 rounded-full">Minder Type : Story</p>
        <p className="bg-gray-200 px-2 rounded-full">
          Author : {session?.user?.name}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-2 flex flex-col gap-2"
      >
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label>Choose Photo</label>
            <input
              type="file"
              className="file-input"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <div className="flex items-center gap-1">
              <label>Tags</label>
              <textarea
                rows={1}
                className="bg-gray-200 w-[40rem] p-2 outline-none border rounded-md resize-none"
                value={tags.join(" ")}
                onChange={handleTagsChange}
                placeholder="Make sure you give space after each tag"
              ></textarea>
            </div>
            {/* <p className="text-red-600 text-sm">*Give space after every tag</p> */}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Heading</label>
          <textarea
            rows={1}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Write heading for your Story"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            rows={2}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description for your Story"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Genre</label>
          <textarea
            rows={1}
            className="bg-gray-200 w-80 p-2 outline-none border rounded-md resize-none"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Category eg. History, Moral, etc"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Content</label>
          <textarea
            rows={16}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write content for your Story"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Summary</label>
          <textarea
            rows={6}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a short summary of your Story"
          ></textarea>
        </div>
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
              <PaperAirplaneIcon className="size-4" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default WriteStory;
