// route.ts
import { connectToDB } from "@/lib/connectDB";
import Community from "@/models/communityModel";
import Post from "@/models/postModel";

export async function DELETE(req: Request): Promise<Response> {
    // Ensure the database connection
    await connectToDB();

    // Try to extract communityId from the query parameters; consider type checking and validation
    const { searchParams } = new URL(req.url);
    const communityId = searchParams.get('communityId');

    // Validate communityId presence
    if (!communityId) {
        return new Response('Missing communityId', { status: 400 });
    }

    try {
        // Attempt to delete the community by its ID
        const deletedCommunity = await Community.findByIdAndDelete(communityId);

        // Check if the community was actually found and deleted
        if (!deletedCommunity) {
            return new Response('Community not found', { status: 404 });
        }

        const deletedPosts = await Post.deleteMany({community: deletedCommunity.communityName});

        // Return success response
        return new Response('Community deleted successfully', { status: 200 });
    } catch (error) {
        // Log and return the error
        console.error('Error deleting community:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
