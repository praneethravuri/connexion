import { connectToDB } from "@/lib/connectDB";
import Post from "@/models/postModel"

export async function POST(req: Request) {
    await connectToDB();
    console.log("here at post create api route");
    try {
        const { postData } = await req.json();


        console.log("Post Data: ", postData);

        await Post.create(postData);
        return new Response(JSON.stringify({ message: "Post Created" }), { status: 201 });
    }
    catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error creating post", err }), { status: 500 });
    }
}