import User from "@/models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const communities = await User.find({});

    return new Response(JSON.stringify(communities), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching communities", err }), { status: 500 });
  }
}