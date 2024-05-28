import User from "@models/userModel";
import connectMongoDB from "./mongoDB";

export async function getUser(email) {
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: email });
    return user ? user : null;
  } catch (err) {
    console.error("Error getting user:", err);
    throw new Error("Error getting user");
  }
}

export async function createUser(data) {
  try {
    await connectMongoDB();
    const newUser = await User.create(data);
    return {
      statusText: "success",
      message: "User created successfully",
      data: newUser,
    };
  } catch (err) {
    return {
      statusText: "error",
      message: "Error creating User",
      error: err.message,
    };
  }
}
