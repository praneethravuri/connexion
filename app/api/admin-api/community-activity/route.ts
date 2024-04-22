// communityActivity.ts
import { connectToDB } from "@/lib/connectDB";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import Community from "@/models/communityModel";

export async function GET(req: Request) {
    try {
        await connectToDB();
        console.log("here at community activity")
        const { searchParams } = new URL(req.url);
        const communityId = searchParams.get("communityId");

        if (!communityId) {
            return new Response(JSON.stringify({ error: 'Community ID is required' }), { status: 400 });
        }

        const community = await Community.findById(communityId);
        if (!community) {
            return new Response(JSON.stringify({ error: 'Community not found' }), { status: 404 });
        }

        const posts = await Post.find({ community: community.communityName });
        const userNames = posts.map(post => post.userName);
        const uniqueUsers = new Set(userNames);

        const responseData = {
            community: community,
            posts: posts,
            totalPosts: posts.length,
            uniqueUsers: uniqueUsers.size
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
