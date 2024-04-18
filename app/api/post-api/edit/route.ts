// route.ts
import { connectToDB } from "@/lib/connectDB";
import Post from "@/models/postModel";

export async function PUT(req: Request) {
    // Connect to the database
    await connectToDB();
    console.log("here");

    // Extract the post ID and updated data from the request body
    const { postData } = await req.json();

    try {
        // Find the post by ID
        const post = await Post.findById(postData.id)
        // If no post is found, send a 404 response
        if (!post) {
            return new Response("Post not found", {status: 400})
            
        }

        // Update the post with new data
        post.title = postData.title || post.title;
        post.contentImageURL = postData.contentImageURL || post.contentImageURL;
        post.contentText = postData.contentText || post.contentText;
        post.community = postData.community || post.community;
        post.userName = postData.userName || post.userName;

        // Save the updated post
        const updatedPost = await post.save();

        // Send a success response
        return new Response("Post updated", {status: 200})
    } catch (error) {
        // Handle potential errors
        console.error("Error updating post:", error);
        return new Response("Error", {status: 500})
    }
}
