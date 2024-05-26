import connectMongoDB from "@lib/mongoDB";
import Minder from "@models/minderModel";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    await connectMongoDB();
    const minders = await Minder.find();
    return NextResponse.json(
      {
        statusText: "success",
        message: "Minder fetched successfully",
        results: minders.length,
        data: {
          minders: minders,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting minders",
      },
      { status: 404 }
    );
  }
}
