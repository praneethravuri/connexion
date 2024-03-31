import Post from "../../../models/postModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
    await connectToDB();

    try {
        const { formData } = await req.json();
        const userData = formData;

        console.log("User Data: ", userData);

        await Post.create(userData);
        return new Response(JSON.stringify({ message: "Post Created" }), { status: 201 });
    }
    catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error creating post", err }), { status: 500 });
    }
}