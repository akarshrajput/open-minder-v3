import User from "@models/userModel";
import connectMongoDB from "@lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const newUser = await User.create(data);
    return NextResponse.json(
      {
        statusText: "success",
        message: "User created successfully",
        data: {
          data: newUser,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error creating User",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const users = await User.find();

    return NextResponse.json(
      {
        statusText: "success",
        message: "Users fetched successfully",
        results: users.length,
        data: {
          users: users,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting users",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
