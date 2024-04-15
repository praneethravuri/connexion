import Post, { IPostDocument } from "@/models/postModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
    await connectToDB();

    console.log("here to insert fake post data");

    try {
        const postDataArray: IPostDocument[] = await req.json();
        console.log("Post Data: ", postDataArray);

        const newPosts = await Post.insertMany(postDataArray);

        return new Response(JSON.stringify({
            message: "Posts Created",
            postDetails: newPosts
        }), { status: 201 });
    }
    catch (err) {
        console.log("Error inserting post data: ", err);
        return new Response(JSON.stringify({ message: "Error creating posts", err }), { status: 500 })
    }
}