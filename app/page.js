import Hero from "@components/Hero";
import NewBlogs from "@components/blogsComponent/NewBlogs";
import NewStories from "@components/storiesComponent/NewStories";
import { auth } from "@lib/auth";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  const session = await auth();

  return (
    <div className="font-medium flex flex-col gap-4">
      <Hero />
      <div className="grid grid-cols-4">
        <NewBlogs />
        <NewStories />
      </div>
    </div>
  );
}
