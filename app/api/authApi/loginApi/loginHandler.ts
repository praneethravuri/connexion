// app/api/login/loginHandler.ts
import User from "../../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function loginHandler(email: string, password: string) {
  await connectToDB();

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      throw new Error("Invalid email or password");
    }

    // User is authenticated
    //email: user.email, userName: user.userName, phoneNumber: user.phoneNumber, createdAt: user.createdAt
    return {
      message: "Login successful", userDetails: {
        email: user.email,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        name: user.name,
        password: user.password,
        userId: user.id
      }
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error logging in");
  }
}