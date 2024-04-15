import Post, { IPost } from "@/models/postModel";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/userModel";
import Community from "@/models/communityModel";
import { faker } from '@faker-js/faker';
import getRandomImageURL from "@/utils/getRandomImageURL";

// Set a fixed seed for consistent fake data generation
faker.seed(123);

// Function to generate a single fake post
const generateFakePost = (community: string, userName: string): IPost => {
    const title = faker.lorem.sentence();
    const contentText = faker.lorem.paragraphs(3);
    const contentImageURL = getRandomImageURL();

    return {
        title,
        contentText,
        contentImageURL,
        community,
        userName,
    };
}

export async function POST(req: Request) {
    await connectToDB();

    try {
        const users = await User.find({}, { userName: 1, _id: 0 }); // Fetch all userNames
        const communities = await Community.find({}, { communityName: 1, _id: 0 }); // Fetch all communities

        if (users.length === 0 || communities.length === 0) {
            throw new Error('No users or communities found in the database.');
        }

        const fakePostsData: IPost[] = [];

        for (let i = 0; i < 10; i++) {
            const randomCommunity = faker.helpers.arrayElement(communities).communityName;
            const randomUser = faker.helpers.arrayElement(users).userName;
            const fakePost = generateFakePost(randomCommunity, randomUser);
            fakePostsData.push(fakePost);
        }

        const newPosts = await Post.insertMany(fakePostsData);

        return new Response(
            JSON.stringify({
                message: "Posts Created",
                postDetails: newPosts
            }),
            { status: 201 }
        );
    } catch (err) {
        console.log("Error inserting fake post data: ", err);
        return new Response(
            JSON.stringify({ message: "Error creating posts", err }),
            { status: 500 }
        );
    }
}