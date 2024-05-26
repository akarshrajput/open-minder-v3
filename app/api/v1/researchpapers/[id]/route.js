import connectMongoDB from "@db/mongoDB";
import Blog from "@models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const blogId = request.url.split("blogs/")[1];
    await connectMongoDB();
    const blog = await Blog.findById(blogId);
    if (blog) {
      return NextResponse.json(
        {
          status: "success",
          message: "Blog found Successfully",
          data: blog,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: `Blog not found with id ${blogId}`,
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

export async function DELETE(request) {
  try {
    const blogId = request.url.split("blogs/")[1];
    await connectMongoDB();
    const blog = await Blog.findByIdAndDelete(blogId);
    return NextResponse.json(
      {
        status: "success",
        message: "Blog deleted Successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { statusText: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const blogId = request.url.split("blogs/")[1];
    await connectMongoDB();
    const updateData = await request.json();
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Blog deleted Successfully",
        data: {
          updatedBlog: updatedBlog,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { statusText: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
