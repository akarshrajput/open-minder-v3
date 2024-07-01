import Hero from "@components/Hero";
import NewArticles from "@components/articleComponent/NewArticles";
import NewBlogs from "@components/blogsComponent/NewBlogs";
import Popular from "@components/popularComponents/Popular";

import NewStories from "@components/storiesComponent/NewStories";
import NewWorks from "@components/worksComponent/NewWorks";

export default async function Home() {
  return (
    <div className="font-medium flex flex-col gap-4">
      <Hero />
      <div className="grid gap-y-4 gap-x-2 grid-cols-2">
        <div className="flex flex-col gap-1">
          <Popular />
          <div className="grid gap-1 grid-cols-2">
            <NewBlogs />
            <NewStories />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="grid gap-1 grid-cols-2">
            <NewArticles />
            <NewWorks />
          </div>
          {/* <div>Container - 4</div> */}
        </div>
      </div>
    </div>
  );
}
