import connectMongoDB from "@lib/mongoDB";
import Minder from "@models/minderModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();
    const slug = request.url.split("minders/slug/")[1];

    const minder = await Minder.findOne({ slug: slug });
    if (minder) {
      return NextResponse.json(
        {
          status: "success",
          message: "Minder found successfully",
          data: minder,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: `Minder not found with slug ${slug}`,
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
