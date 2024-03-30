import User from "../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
  console.log("Present at route");
  await connectToDB();

  try {
    const { formData } = await req.json();
    const userData = formData;
    await User.create(userData);
    return new Response(JSON.stringify({ message: "User Created" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error creating user", err }), { status: 500 });
  }
}