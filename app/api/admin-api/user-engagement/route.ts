import { connectToDB } from "@/lib/connectDB";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import Community from "@/models/communityModel";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        // Fetching user details
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Fetching posts made by the user
        const posts = await Post.find({ userName: user?.userName });

        // Extracting unique community identifiers from the posts
        const communitySet = new Set(posts.map(post => post.community));
        const communityNames = Array.from(communitySet);

        // Fetching community details based on extracted names
        const communities = await Community.find({ communityName: { $in: communityNames } });

        const responseData = {
            user: user,
            posts: posts,
            communities: communities
        };

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
