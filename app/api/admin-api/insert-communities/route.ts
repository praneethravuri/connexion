import { connectToDB } from "@/lib/connectDB";
import Community, { ICommunity } from "@/models/communityModel";
import { faker } from '@faker-js/faker';
import getRandomImageURL from "@/utils/getRandomImageURL";

faker.seed(123);

const generateFakeCommunity = (): ICommunity => {
    const communityName = faker.word.noun();
    const communityImage = getRandomImageURL();
    const communityBio = faker.lorem.sentence();
    const communityMembers = faker.datatype.number({ min: 100, max: 10000 });

    return {
        communityName,
        communityImage,
        communityBio,
        communityMembers
    }
}

export async function POST(req: Request) {
    await connectToDB();

    try {
        const existingCommunities = await Community.find({}, { communityName: 1, _id: 0 });
        const existingCommunityNames = new Set(existingCommunities.map(c => c.communityName));

        const fakeCommunityData: ICommunity[] = [];

        for (let i = 0; i < 10; i++) {
            let fakeCommunity = generateFakeCommunity();
            while (existingCommunityNames.has(fakeCommunity.communityName)) {
                fakeCommunity = generateFakeCommunity();
            }
            fakeCommunityData.push(fakeCommunity);
            existingCommunityNames.add(fakeCommunity.communityName);
        }

        const newCommunities = await Community.insertMany(fakeCommunityData);

        return new Response(
            JSON.stringify({
                message: "Communities Created",
                communityDetails: newCommunities
            }), { status: 201 }
        )
    } catch (err) {
        console.log("Error inserting fake community data: ", err);
        return new Response(
            JSON.stringify({ message: "Error creating communities", err }), { status: 500 }
        )
    }
}