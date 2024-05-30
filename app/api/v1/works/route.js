import connectMongoDB from "@lib/mongoDB";
import Work from "@models/projectModel";
import APIFeatures from "@utils/apiFeatures";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const features = new APIFeatures(Work.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const works = await features.query;
    // console.log("Works fetched:", Work);

    return NextResponse.json(
      {
        statusText: "success",
        message: "Works fetched successfully",
        results: works.length,
        data: {
          works: works,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching Works");

    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting works",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const newWork = await Work.create(data);
    return NextResponse.json(
      {
        statusText: "success",
        message: "Work created successfully",
        data: {
          data: newWork,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error creating work",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
