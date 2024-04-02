// app/api/fetch-selected-community/route.ts
import Community from "@/models/communityModel";
import { connectToDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    console.log("herer");
    const { searchParams } = new URL(req.url);
    const communityName = searchParams.get('communityName');

    if (!communityName) {
      return NextResponse.json({ message: "Community name is required" }, { status: 400 });
    }
    console.log(communityName);
    // Find the community with the provided name
    const community = await Community.findOne({ communityName: communityName.toLowerCase() });

    if (!community) {
      return NextResponse.json({ message: "Community not found" }, { status: 404 });
    }

    return NextResponse.json(community, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error fetching community", err }, { status: 500 });
  }
}