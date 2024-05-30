import connectMongoDB from "@lib/mongoDB";
import Work from "@models/projectModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();
    const slug = request.url.split("works/slug/")[1];
    // console.log(slug);
    const work = await Work.findOne({ slug: slug });
    if (work) {
      return NextResponse.json(
        {
          status: "success",
          message: "work found successfully",
          data: work,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: `work not found with slug ${slug}`,
        },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { statusText: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
