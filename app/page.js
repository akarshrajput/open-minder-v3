import Hero from "@components/Hero";
import NewArticles from "@components/articleComponent/NewArticles";
import NewBlogs from "@components/blogsComponent/NewBlogs";
import Popular from "@components/popularComponents/Popular";

import NewStories from "@components/storiesComponent/NewStories";
import { auth } from "@lib/auth";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  const session = await auth();

  return (
    <div className="font-medium flex flex-col gap-4">
      <Hero />
      <div className="grid gap-y-4 gap-x-2 grid-cols-2">
        <div>
          <Popular />
        </div>
        <div className="grid gap-1 grid-cols-2">
          <NewArticles />
          <p>Hi</p>
        </div>
        <div className="grid gap-1 grid-cols-2">
          <NewBlogs />
          <NewStories />
        </div>
        <div>Container - 4</div>
      </div>
    </div>
  );
}
