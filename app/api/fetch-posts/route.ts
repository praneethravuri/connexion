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
      // Ensure filter is a string for the MongoDB query.
      // Using RegExp for case-insensitive search, assuming `filter` is not null here.
      const regex = new RegExp(filter, 'i'); // 'i' for case-insensitive
      posts = await Post.find({ community: regex });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error fetching posts", err }), { status: 500 });
  }
}
