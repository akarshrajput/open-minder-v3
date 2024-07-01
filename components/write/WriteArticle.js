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

const WriteArticle = ({ supabaseURL, hostname, session }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(""); // This will store the HTML content from QuillEditor
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [journal, setJournal] = useState("");
  const [source, setSource] = useState("");
  const [summary, setSummary] = useState("");
  const [abstract, setAbstract] = useState("");
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
      const articleData = {
        heading: heading,
        description: description,
        content: content, // HTML content from QuillEditor
        tags: tags,
        source: source,
        abstract: abstract,
        journal: journal,
        summary: summary,
        author: session.user.userId,
        minderType: "Article",
        featuredImage: imagePath,
      };

      console.log(articleData);

      const response = await axios.post(
        `${hostname}/api/v1/minders`,
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const avatarFile = featuredImage;
      await supabase.storage.from("minder-image").upload(imageName, avatarFile);

      const slug = response?.data?.data?.data?.slug;
      toast.success("Article posted!");
      router.push(`/read/${slug}`);

      setHeading("");
      setDescription("");
      setContent("");
      setFeaturedImage("");
      setTags("");
      setJournal("");
      setSource("");
      setSummary("");
      setAbstract("");
    } catch (error) {
      toast.error("Error posting article:", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-medium text-stone-600 flex flex-col gap-2">
      <div className="flex gap-2 px-2 items-center text-sm">
        <p className="bg-stone-100 px-3 py-0.5 text-stone-600 border rounded-full">
          Minder Type : Article
        </p>
        <p className="bg-stone-100 px-3 py-0.5 text-stone-600 text-stone-60 border rounded-full">
          Author : {session?.user?.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-2">
        <QuillEditor value={content} onChange={setContent} />
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Heading</label>
          <textarea
            rows={1}
            className="bg-inherit w-full p-2 outline-none bg-stone-100 border border-stone-300 rounded-sm resize-none"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Write heading for your Article"
          ></textarea>
        </div>
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
                onChange={(e) => setTags(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description for your Article"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Journal</label>
          <textarea
            rows={4}
            className="bg-stone-100 w-full p-2 outline-none border border-stone-300 rounded-sm resize-none"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write journal for your Article"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Abstract</label>
          <textarea
            rows={6}
            className="bg-stone-100 w-full p-2 outline-none border border-stone-300 rounded-sm resize-none"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Write abstract for your Article"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Summary</label>
          <textarea
            rows={4}
            className="bg-stone-100 w-full p-2 outline-none border border-stone-300 rounded-sm resize-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write summary for your Article"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-stone-200">Sources</label>
          <textarea
            rows={1}
            className="bg-stone-100 w-full p-2 outline-none border border-stone-300 rounded-sm resize-none"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Write sources for your Article"
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
              <PaperPlaneRight weight="bold" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};
export default dynamic(() => Promise.resolve(WriteArticle), { ssr: false });
