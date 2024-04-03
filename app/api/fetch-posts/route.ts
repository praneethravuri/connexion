import Post from "@/models/postModel";
import { connectToDB } from "@/lib/connectDB";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter');

    let posts;

    console.log("Post Filter: ", filter);

    if (filter === 'all' || filter === null) {
      posts = await Post.find();
    } else {
      // Use RegExp for case-insensitive search
      const regex = new RegExp(filter, 'i'); // 'i' for case-insensitive
      // Find posts where either the userName or community matches the filter
      posts = await Post.find({
        $or: [
          { userName: regex },
          { community: regex }
        ]
      });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching posts", err }), { status: 500 });
  }
}
