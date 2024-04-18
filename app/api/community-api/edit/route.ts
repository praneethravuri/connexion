// communityRoute.ts
import { connectToDB } from "@/lib/connectDB";
import Community from "@/models/communityModel";
import Post from "@/models/postModel";  // Import the Post model

export async function PUT(req: Request): Promise<Response> {
    await connectToDB();
    
    const url = new URL(req.url);
    const communityId = url.searchParams.get('communityId');

    if (!communityId) {
        return new Response("Community ID is missing", { status: 400 });
    }

    const { communityData } = await req.json();

    try {
        const community = await Community.findById(communityId);
        if (!community) {
            return new Response("Community not found", { status: 404 });
        }

        // Check if the community name is going to change
        const oldName = community.communityName;
        const newName = communityData.communityName;

        community.communityName = newName || community.communityName;
        community.communityImage = communityData.communityImage || community.communityImage;
        community.communityBio = communityData.communityBio || community.communityBio;
        community.communityMembers = communityData.communityMembers || community.communityMembers;

        await community.save();

        // If the community name has changed, update all related posts
        if (newName && oldName !== newName) {
            await Post.updateMany(
                { community: oldName }, 
                { $set: { community: newName } }
            );
        }

        return new Response(JSON.stringify(community), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error updating community:", error);
        return new Response("Error updating community", { status: 500 });
    }
}
