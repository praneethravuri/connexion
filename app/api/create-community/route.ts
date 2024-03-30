import Community from "@/models/communityModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
  console.log("Here at post api route");

  await connectToDB();

  try {
    const { communityName, communityImage, communityBio, communityMembers } = await req.json();
    const communityData = { communityName, communityImage, communityBio, communityMembers };

    await Community.create(communityData);

    return new Response(JSON.stringify({ message: "Community Created" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error creating community", err }), { status: 500 });
  }
}