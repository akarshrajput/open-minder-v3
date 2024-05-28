import connectMongoDB from "@lib/mongoDB";
import Minder from "@models/minderModel";
import { NextResponse } from "next/server";
import APIFeatures from "@utils/apiFeatures";

export async function GET(request) {
  try {
    await connectMongoDB();
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const features = new APIFeatures(Minder.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const minders = await features.query;
    console.log("Minders fetched:", minders);

    return NextResponse.json(
      {
        statusText: "success",
        message: "Minders fetched successfully",
        results: minders.length,
        data: {
          minders: minders,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching minders:", err);

    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting minders",
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
    const newMinder = await Minder.create(data);
    return NextResponse.json(
      {
        statusText: "success",
        message: "Minder created successfully",
        data: {
          data: newMinder,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error creating Minder",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
