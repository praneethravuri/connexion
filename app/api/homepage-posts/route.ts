import Post from "../../(models)/postModel";
import { connectToDB } from "@/lib/connectDB";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const posts = await Post.find();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching posts", err }), { status: 500 });
  }
}