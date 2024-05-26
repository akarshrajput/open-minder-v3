import connectMongoDB from "@db/mongoDB";
import Blog from "@models/blogModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const newBlog = await Blog.create(data);
    return NextResponse.json(
      {
        statusText: "success",
        message: "Blog created successfully",
        data: {
          data: newBlog,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error creating blog",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const blogs = await Blog.find();
    return NextResponse.json(
      {
        statusText: "success",
        message: "Blog fetched successfully",
        results: blogs.length,
        data: {
          blogs: blogs,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting blogs",
      },
      { status: 404 }
    );
  }
}
