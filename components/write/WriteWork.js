"use client";

import axios from "axios";
import { useState } from "react";
import supabase from "@lib/supabase";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const WriteWork = ({ supabaseURL, hostname, session }) => {
  const [workType, setWorkType] = useState("Project");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [source, setSource] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [collectedInputImages, setCollectedInputImages] = useState([]); // Changed to array
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (collectedInputImages.length === 0) {
      toast.error("Please select at least one image file.");
      return;
    }

    const invalidImage = collectedInputImages.some(
      (image) => image.type.split("/")[0] !== "image"
    );

    if (invalidImage) {
      toast.error("Only image files are allowed");
      return;
    }

    if (!title || !description || !content || tags.length === 0) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setIsLoading(true);
      toast.success("Uploading Images...");
      let uploadedImagePaths = [];
      for (const image of collectedInputImages) {
        const imageName = `${Math.random()}-${Date.now()}-${image.name.replace(
          /\s+/g,
          "-"
        )}`;
        const imagePath = `${supabaseURL}/storage/v1/object/public/project-image/${imageName}`;
        uploadedImagePaths.push(imagePath);
        await supabase.storage.from("project-image").upload(imageName, image);
      }

      const featuredImageName = `${Math.random()}-${Date.now()}-${featuredImage.name.replace(
        /\s+/g,
        "-"
      )}`;
      const featuredImagePath = `${supabaseURL}/storage/v1/object/public/project-image/${featuredImageName}`;
      await supabase.storage
        .from("project-image")
        .upload(featuredImageName, featuredImage);

      toast.success("Images Uploaded!");
      toast.success("Uploading Minder data...");

      const blogData = {
        workType: workType,
        title: title,
        description: description,
        content: content,
        tags: tags,
        author: session.user.userId,
        source: source,
        collectedImages: uploadedImagePaths,
        featuredImage: featuredImagePath,
      };

      const response = await axios.post(`${hostname}/api/v1/works`, blogData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Minder data Uploaded!");

      toast.success("Work posted!");
      router.push(`/work/${response?.data?.data?.data?.slug}`);
    } catch (error) {
      toast.error("Error posting blog", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = (e) => {
    const inputTags = e.target.value.split(" ").filter((tag) => tag);
    setTags(inputTags);
  };

  const handleAddImage = () => {
    setCollectedInputImages([...collectedInputImages, null]);
  };

  const handleImageChange = (index, e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const updatedImages = [...collectedInputImages];
      updatedImages[index] = files[0];
      setCollectedInputImages(updatedImages);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...collectedInputImages];
    updatedImages.splice(index, 1);
    setCollectedInputImages(updatedImages);
  };

  return (
    <div className="font-medium flex flex-col gap-2">
      <div className="flex gap-2 items-center text-sm">
        <p className="bg-gray-200 px-2 rounded-full flex items-center gap-1">
          Share Work
        </p>
        <p className="bg-gray-200 px-2 rounded-full">
          Author : {session?.user?.name}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-2 flex flex-col gap-2"
      >
        <div className="flex gap-2 items-center">
          <label>Work Type</label>
          <select
            className="cursor-pointer w-fit outline-none p-1 rounded-md bg-gray-200"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option value="Project">Project (By default)</option>
            <option value="Website">Website</option>
            <option value="Software">Software</option>
            <option value="Research">Research</option>
            <option value="Article">Article</option>
            <option value="Biography">Biography</option>
            <option value="Blog">Blog</option>
            <option value="News">News</option>
            <option value="Story">Story</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Case Study">Case Study</option>
            <option value="Review">Review</option>
            <option value="Essay">Essay</option>
            <option value="Presentation">Presentation</option>
            <option value="Documentation">Documentation</option>
            <option value="White Paper">White Paper</option>
            <option value="Poetry">Poetry</option>
            <option value="Report">Report</option>
            <option value="Thesis">Thesis</option>
            <option value="Portfolio">Portfolio</option>
          </select>
        </div>

        <div className="flex gap-1 items-center">
          <div>
            <div className="flex gap-2 items-center">
              <label>Featured Image</label>
              <input
                type="file"
                className="file-input"
                onChange={(e) => setFeaturedImage(e.target.files[0])}
              />
            </div>
          </div>
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
        </div>
        <div className="flex flex-col gap-1">
          <label>Title</label>
          <textarea
            rows={1}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Write title for your ${workType}`}
          ></textarea>
        </div>
        <div className="flex items-start flex-wrap gap-4">
          <p>Add multiple {workType ? workType : "work"} images</p>
          <div className="flex flex-col gap-1">
            {collectedInputImages.map((image, index) => (
              <div key={index} className="flex gap-2 items-center">
                <label>Add image {index} : </label>
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => handleImageChange(index, e)}
                />
                {image && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-gray-800 text-gray-200 px-2 rounded w-fit"
            >
              <div className="flex items-center gap-1 p-2">Add Image</div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            rows={2}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Write description for your ${workType}`}
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label>Content</label>
          <textarea
            rows={16}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Write content for your ${workType}`}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Source</label>
          <textarea
            rows={2}
            className="bg-gray-200 w-full p-2 outline-none border rounded-md resize-none"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder={`Write source for your ${workType}`}
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

export default WriteWork;
