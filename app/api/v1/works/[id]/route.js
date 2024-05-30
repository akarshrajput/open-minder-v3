import connectMongoDB from "@lib/mongoDB";
import Work from "@models/projectModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const workId = request.url.split("works/")[1];
    await connectMongoDB();
    const work = await Work.findById(workId);
    if (work) {
      return NextResponse.json(
        {
          status: "success",
          message: "work found Successfully",
          data: work,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: `work not found with id ${workId}`,
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
    const workId = request.url.split("works/")[1];
    await connectMongoDB();
    const work = await Work.findByIdAndDelete(workId);
    return NextResponse.json(
      {
        status: "success",
        message: "work deleted Successfully",
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
    const workId = request.url.split("works/")[1];
    await connectMongoDB();
    const updateData = await request.json();
    const updatedwork = await Work.findByIdAndUpdate(workId, updateData, {
      new: true,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "work deleted Successfully",
        data: {
          updatedwork: updatedwork,
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
