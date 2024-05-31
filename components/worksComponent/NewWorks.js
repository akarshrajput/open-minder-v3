import { CheckBadgeIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const NewWorks = async () => {
  const hostname = process.env.HOST_NAME;
  const res = await fetch(`${hostname}/api/v1/works?sort=-createdAt`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const fetchedWork = data?.data?.works;
  //   console.log(fetchedWork);

  return (
    <div className="flex flex-col gap-4 p-1 rounded-sm">
      <div className="flex gap-1 items-center">
        <NewspaperIcon className="size-4" />
        <p>New Works</p>
      </div>
      {fetchedWork.map((work) => (
        <Blog work={work} key={work._id} />
      ))}
    </div>
  );
};

const Blog = ({ work }) => {
  const newHeading = work?.title.substring(0, 50);
  const newDescription = work?.description.substring(0, 80);
  const image = work?.featuredImage;
  console.group(image);
  return (
    <div>
      <Link href={`/work/${work.slug}`}>
        <div className="px-1 cursor-pointer flex flex-col gap-1 border-l-2 pl-2 border-l-gray-400 ">
          <div className="flex text-sm font-medium items-center gap-1">
            <img src={work?.author?.photo} className="w-5 rounded-full" />
            <p

            // href={`/user/${blog?.author?._id}`}
            >
              {work?.author?.name}
            </p>
            {work?.author?.verified ? (
              <CheckBadgeIcon className="size-4 text-cyan-600" />
            ) : (
              ""
            )}
            <p className="font-medium bg-gray-200 px-2 rounded-lg">
              {work?.minderType}
            </p>
          </div>
          <p className="font-semibold"> {newHeading}</p>
          <p className="text-sm">{newDescription}</p>

          <div className="flex justify-center w-full overflow-hidden h-48">
            <img
              src={`${image}`}
              className="rounded-md w-full object-cover"
              alt="Featured Image"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewWorks;
