import connectMongoDB from "@lib/mongoDB";
import Minder from "@models/minderModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const minderId = request.url.split("minders/")[1];
    await connectMongoDB();
    const minder = await Minder.findById(minderId);
    if (minder) {
      return NextResponse.json(
        {
          status: "success",
          message: "Minder found Successfully",
          data: minder,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: `Minder not found with id ${minderId}`,
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
    const minderId = request.url.split("minders/")[1];
    await connectMongoDB();
    const minder = await Minder.findByIdAndDelete(minderId);
    return NextResponse.json(
      {
        status: "success",
        message: "Minder deleted Successfully",
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
    const minderId = request.url.split("minders/")[1];
    await connectMongoDB();
    const updateData = await request.json();
    const updatedMinder = await Minder.findByIdAndUpdate(minderId, updateData, {
      new: true,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Minder deleted Successfully",
        data: {
          updatedMinder: updatedMinder,
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
