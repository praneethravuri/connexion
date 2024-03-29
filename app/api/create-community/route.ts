import Community from "@/app/(models)/communityModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
  console.log("Here at post api route");

  await connectToDB();

  try {
    const { communityName, communityImage } = await req.json();
    const userData = { communityName, communityImage };

    await Community.create(userData);

    return new Response(JSON.stringify({ message: "Community Created" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error creating community", err }), { status: 500 });
  }
}