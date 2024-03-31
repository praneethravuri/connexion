import User from "../../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
  console.log("Present at login route");
  await connectToDB();

  try {
    const { email, password } = await req.json();

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // User is authenticated, send the email and username in the response
    return new Response(JSON.stringify({ message: "Login successful", email: user.email, userName: user.userName }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error logging in", err }), { status: 500 });
  }
}