import TopBlogs from "@components/blogsComponent/TopBlogs";
import { auth } from "@lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <TopBlogs />
    </div>
  );
}
