import { faker } from '@faker-js/faker';
import { connectToDB } from "@/lib/connectDB";
import Community from "@/models/communityModel";
import User from "@/models/userModel";
import { IPost } from '@/models/postModel';
import getRandomImageURL from '../getRandomImageURL';

// Set a fixed seed for consistent fake data generation
faker.seed(123);

// Function to generate a single fake post with assigned community and user
const generateFakePost = (community: string, userName: string): IPost => {
    const title = faker.lorem.sentence();
    const contentText = faker.lorem.paragraphs(3);
    const contentImageURL = getRandomImageURL();

    return {
        title,
        contentText,
        contentImageURL,
        community,
        userName
    };
}

// Function to fetch communities and users, then generate multiple posts
export const generateFakePosts = async () => {
    await connectToDB();  // Ensure DB is connected

    try {
        const communities = await Community.find({});  // Fetch all communities
        const users = await User.find({});             // Fetch all users
        const posts: IPost[] = [];

        if (communities.length === 0 || users.length === 0) {
            throw new Error('No communities or users found in database.');
        }

        for (let i = 0; i < 10; i++) {  // Generate 10 posts
            const randomCommunity = communities[Math.floor(Math.random() * communities.length)].communityName;
            const randomUser = users[Math.floor(Math.random() * users.length)].userName;

            const post = generateFakePost(randomCommunity, randomUser);
            posts.push(post);
        }

        return posts;  // Return the array of generated posts
    } catch (error) {
        console.error("Error generating posts: ", error);
        return [];
    }
}

// Optional: Call generateFakePosts and handle the result, for example in a seed script or manually
generateFakePosts().then(posts => console.log(posts)).catch(err => console.error(err));
