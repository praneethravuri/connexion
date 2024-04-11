// route.ts
import { connectToDB } from "@/lib/connectDB";
import Post from "@/models/postModel";

export async function DELETE(req: Request): Promise<Response> {
    // Ensure the database connection
    await connectToDB();

    // Try to extract postId from the query parameters; consider type checking and validation
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    // Validate postId presence
    if (!postId) {
        return new Response('Missing postId', { status: 400 });
    }

    try {
        // Attempt to delete the post by its ID
        const deletedPost = await Post.findByIdAndDelete(postId);

        // Check if the post was actually found and deleted
        if (!deletedPost) {
            return new Response('Post not found', { status: 404 });
        }

        // Return success response
        return new Response('Post deleted successfully', { status: 200 });
    } catch (error) {
        // Log and return the error
        console.error('Error deleting post:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
